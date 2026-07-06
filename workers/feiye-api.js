// ── Feiye CI — Dify API Proxy Worker ──
// Route: feiye.ci.geodriv.com/api/dify/*
// or: ci.geodriv.com/feiye/api/dify/* (via Pages _redirects + Workers route)

const DIFY_BASE = 'https://api.dify.ai/v1';
const BEARER_TOKEN = 'app-690QO6Znw2IvDYBiDRoVBvxL';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Strip the path prefix to get the Dify API path
    // Input: /feiye/api/dify/chat-messages
    // Output: /chat-messages
    const apiPath = url.pathname.replace(/^\/feiye\/api\/dify/, '') || '/';
    const targetUrl = `${DIFY_BASE}${apiPath}${url.search}`;

    // Forward the request with the bearer token
    const headers = new Headers(request.headers);
    headers.set('Authorization', `Bearer ${BEARER_TOKEN}`);
    headers.set('Host', 'api.dify.ai');

    const proxyRequest = new Request(targetUrl, {
      method: request.method,
      headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
    });

    const response = await fetch(proxyRequest);

    // CORS for ci.geodriv.com
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
