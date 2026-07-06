// ── GEOLYX Aerospace — Dify API Proxy Worker ──
// Route: ci.geodriv.com/aerospace/api/*

const DIFY_BASE = 'https://api.dify.ai/v1';
const BEARER_TOKEN = 'app-DFtLD3FbYrc1NLZOanrwe78y';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Strip /aerospace/api prefix → Dify API path
    const apiPath = url.pathname.replace(/^\/aerospace\/api/, '') || '/';
    const targetUrl = `${DIFY_BASE}${apiPath}${url.search}`;

    const headers = new Headers(request.headers);
    headers.set('Authorization', `Bearer ${BEARER_TOKEN}`);
    headers.set('Host', 'api.dify.ai');

    const proxyRequest = new Request(targetUrl, {
      method: request.method,
      headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
    });

    const response = await fetch(proxyRequest);

    const corsHeaders = new Headers(response.headers);
    corsHeaders.set('Access-Control-Allow-Origin', 'https://ci.geodriv.com');
    corsHeaders.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    corsHeaders.set('Access-Control-Allow-Headers', 'Content-Type');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: corsHeaders,
    });
  },
};
