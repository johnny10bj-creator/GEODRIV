const jwksCache = new Map();
const decoder = new TextDecoder();

function decodeBase64Url(value) {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) throw new Error('Invalid encoding');
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  return Uint8Array.from(atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')), c => c.charCodeAt(0));
}

export async function verifyAccess(request, env) {
  const issuer = String(env.ACCESS_TEAM_DOMAIN || '').replace(/\/$/, '');
  if (!/^https:\/\/[a-z0-9-]+\.cloudflareaccess\.com$/.test(issuer) || !env.ACCESS_AUD) throw new Error('Access not configured');
  const token = request.headers.get('Cf-Access-Jwt-Assertion');
  if (!token || token.length > 16384) throw new Error('Access required');
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Invalid token');
  const header = JSON.parse(decoder.decode(decodeBase64Url(parts[0])));
  const claims = JSON.parse(decoder.decode(decodeBase64Url(parts[1])));
  const now = Math.floor(Date.now() / 1000);
  const audiences = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
  if (header.alg !== 'RS256' || !header.kid || header.crit || claims.iss !== issuer || !audiences.includes(env.ACCESS_AUD) ||
      typeof claims.exp !== 'number' || !Number.isFinite(claims.exp) || claims.exp <= now ||
      (claims.nbf !== undefined && (typeof claims.nbf !== 'number' || !Number.isFinite(claims.nbf) || claims.nbf > now)) ||
      typeof claims.sub !== 'string' || !claims.sub) throw new Error('Invalid claims');
  let entry = jwksCache.get(issuer);
  let jwk = entry?.expires > Date.now() ? entry.keys.find(key => key.kid === header.kid) : null;
  if (!jwk) {
    const response = await fetch(`${issuer}/cdn-cgi/access/certs`, {redirect: 'error'});
    if (!response.ok) throw new Error('Verification unavailable');
    const data = await response.json();
    if (!Array.isArray(data.keys)) throw new Error('Invalid keys');
    entry = {keys: data.keys, expires: Date.now() + 300000};
    jwksCache.set(issuer, entry);
    jwk = entry.keys.find(key => key.kid === header.kid);
  }
  if (!jwk || jwk.kty !== 'RSA' || (jwk.alg && jwk.alg !== 'RS256') || (jwk.use && jwk.use !== 'sig')) throw new Error('Invalid key');
  const key = await crypto.subtle.importKey('jwk', jwk, {name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256'}, false, ['verify']);
  const valid = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, decodeBase64Url(parts[2]), new TextEncoder().encode(`${parts[0]}.${parts[1]}`));
  if (!valid) throw new Error('Invalid signature');
  return claims;
}

function error(status, message) {
  return Response.json({error: message}, {status, headers: {'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff'}});
}

export async function proxy(request, env, prefix) {
  const url = new URL(request.url);
  if (!url.pathname.startsWith(`${prefix}/`)) return error(404, 'Not found');
  const path = url.pathname.slice(prefix.length);
  if (!['/workflows/run', '/files/upload'].includes(path)) return error(404, 'Not found');
  if (request.method !== 'POST') return error(405, 'Method not allowed');
  const origin = request.headers.get('Origin');
  if (origin && (!env.ALLOWED_ORIGIN || origin !== env.ALLOWED_ORIGIN)) return error(403, 'Origin not allowed');
  let claims;
  try { claims = await verifyAccess(request, env); } catch { return error(403, 'Authentication required'); }
  if (!env.DIFY_API_KEY) return error(503, 'Service unavailable');
  // Never forward client credentials, Access tokens or arbitrary headers to Dify.
  const headers = new Headers({Authorization: `Bearer ${env.DIFY_API_KEY}`});
  let body;
  try {
    if (path === '/files/upload') {
      if (!request.headers.get('Content-Type')?.startsWith('multipart/form-data')) return error(415, 'Multipart form required');
      body = await request.formData();
      body.set('user', claims.sub);
    } else {
      if (!request.headers.get('Content-Type')?.startsWith('application/json')) return error(415, 'JSON required');
      const data = await request.json();
      if (!data || typeof data !== 'object' || Array.isArray(data)) return error(400, 'Invalid request');
      data.user = claims.sub;
      body = JSON.stringify(data);
      headers.set('Content-Type', 'application/json');
    }
  } catch { return error(400, 'Invalid request'); }
  try {
    const upstream = await fetch(`https://api.dify.ai/v1${path}`, {method: 'POST', headers, body, redirect: 'error'});
    const responseHeaders = new Headers({'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff'});
    const contentType = upstream.headers.get('Content-Type');
    if (contentType) responseHeaders.set('Content-Type', contentType);
    if (origin && origin === env.ALLOWED_ORIGIN) responseHeaders.set('Access-Control-Allow-Origin', origin);
    return new Response(upstream.body, {status: upstream.status, headers: responseHeaders});
  } catch { return error(502, 'Upstream unavailable'); }
}
