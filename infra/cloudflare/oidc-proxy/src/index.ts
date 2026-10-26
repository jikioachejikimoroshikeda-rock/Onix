import { validateOidcJwt } from './auth';

export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ ok: true, service: 'anthropic-oidc-proxy' }), {
        headers: { 'content-type': 'application/json' },
      });
    }

    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Missing bearer token' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      });
    }

    const jwt = authHeader.replace('Bearer ', '').trim();

    try {
      const claims = await validateOidcJwt(jwt, env.OIDC_AUDIENCE ?? 'goose-oidc-proxy', env.OIDC_ISSUER ?? 'https://token.actions.githubusercontent.com');

      if (!env.UPSTREAM_API_KEY) {
        return new Response(JSON.stringify({ error: 'Upstream API key not configured' }), {
          status: 500,
          headers: { 'content-type': 'application/json' },
        });
      }

      const upstreamUrl = `${env.UPSTREAM_URL ?? 'https://api.anthropic.com'}${url.pathname}${url.search}`;
      const upstreamRequest = new Request(upstreamUrl, {
        method: request.method,
        headers: {
          ...(request.headers as any),
          'content-type': request.headers.get('content-type') ?? 'application/json',
          [env.UPSTREAM_AUTH_HEADER ?? 'x-api-key']: env.UPSTREAM_API_KEY,
        },
        body: request.method === 'GET' || request.method === 'HEAD' ? undefined : await request.text(),
      });

      const response = await fetch(upstreamRequest);
      const text = await response.text();

      return new Response(text, {
        status: response.status,
        headers: {
          'content-type': response.headers.get('content-type') ?? 'application/json',
          'x-oidc-subject': claims.sub ?? '',
        },
      });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message ?? 'OIDC validation failed' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      });
    }
  },
};
