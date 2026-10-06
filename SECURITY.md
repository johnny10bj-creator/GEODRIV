# Internal tools and credentials

The public marketing site must not distribute internal application interfaces, email administration, access lists, credentials or source archives. `/aerospace/` and `/feiye/` currently serve an access-restricted notice, not the internal applications. Their former source remains recoverable from Git history; restore it only into access-controlled hosting after reviewing it for private data.

## Required external actions

1. Revoke the two previously committed Dify app keys. Treat them as compromised regardless of their current apparent use. Removal from the current branch does not revoke them or erase public Git history, old branches, downloaded archives or caches.
2. Create replacement keys in Dify and configure each Worker using the encrypted `DIFY_API_KEY` secret binding. Never place the value in JavaScript, HTML, a committed config file, an archive or a frontend environment variable.
3. Configure a Cloudflare Access application with the existing intended audience only, covering the private UI and API routes, and disable any alternative unprotected ingress. Add `ACCESS_TEAM_DOMAIN`, `ACCESS_AUD` and `ALLOWED_ORIGIN` to the Worker configuration. The origin must be the exact approved private UI origin.
4. Deploy the updated Worker source through a bundler such as Wrangler so `secure-proxy.mjs` is included. The repository's GitHub Pages deployment does not deploy Cloudflare Workers or apply account secrets/policies.
5. Verify missing, expired, forged and wrong-audience tokens are rejected on the deployed API. Only then restore the UI on protected hosting. Client-side email lists and session/local storage are not authorization controls.
6. Plan repository-history cleanup after key revocation and coordinate it with all clones and branch users. Do not silently force-push rewritten history; removal of recoverable objects and forks may require GitHub support.

The proxy validates the Access JWT signature, issuer, audience and expiry against the configured team's current public signing keys. It accepts only the workflow-run and file-upload POST endpoints used by these applications, binds the upstream user to the authenticated identity, and forwards no incoming credentials to Dify. Missing configuration rejects requests rather than enabling anonymous use.

Deployment references:
- https://developers.cloudflare.com/workers/configuration/secrets/
- https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/

`robots.txt` and `noindex` control crawling, not authentication. Access-restricted notice pages intentionally contain no application scripts or administration controls.
