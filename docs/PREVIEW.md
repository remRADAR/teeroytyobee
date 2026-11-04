# Sandbox preview and forwarded-host 403

## Diagnosis

The application itself is healthy: `http://127.0.0.1:5173/` returned HTTP 200. The forwarded HTTPS host returned Vite's explicit `Blocked request. This host (...) is not allowed` message. This is Vite's DNS-rebinding protection, not an application route error or evidence that the tunnel server is down.

## Safe fix

Vite accepts only the exact forwarded hostname through `server.allowedHosts` and `preview.allowedHosts`. `vite.config.js` reads it from `MANUS_PREVIEW_HOST`; do not disable host protection with `allowedHosts: true` or use a broad wildcard.

For the current session, start the server with the hostname shown in Vite's 403 body (hostname only—no scheme, path or port):

```sh
MANUS_PREVIEW_HOST=5173-ikrdjkzjoej8397m5gfrj-c5651320.us3.manus.computer npm run dev -- --host 0.0.0.0
```

Stop any old Vite process using port 5173 first. Then check the local route and forwarded HTTPS URL, for example:

```sh
curl -I http://127.0.0.1:5173/
curl -I https://5173-ikrdjkzjoej8397m5gfrj-c5651320.us3.manus.computer/
```

The first should return 200 locally; the second should return 200 after the exact host is allow-listed and the tunnel is active. Forwarded hostnames are session/environment specific, and the temporary preview depends on the sandbox and dev server remaining available. For a durable public URL, publish through a hosting provider; no public deployment is included here.
