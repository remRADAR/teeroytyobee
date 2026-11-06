# Cloudflare Pages and Workers AI

The project is connected to the Cloudflare Pages project `teeroytyobee`.

- GitHub repository: `remRADAR/teeroytyobee`
- Production branch: `feat/gojett-teeroy-complete-reconstruction`
- Build command: `npm run build`
- Build output: `dist`
- Pages project URL: `https://teeroytyobee.pages.dev`

`wrangler.jsonc` is the source-controlled Pages Functions configuration. It declares the `AI` Workers AI binding and the Pages build output directory. The `/functions/api/ai.js` endpoint accepts a JSON POST body such as `{ "prompt": "..." }` and invokes `@cf/meta/llama-3.1-8b-instruct` through the server-side binding. No model call is made during build or tests.

Workers AI usage can incur account charges when the endpoint is called. The endpoint validates input, limits prompts to 4,000 characters, keeps the binding server-side, and returns a clear 503 response until the binding is available in the deployed Pages environment.
