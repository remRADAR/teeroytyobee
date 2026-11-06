const MODEL = '@cf/meta/llama-3.1-8b-instruct-fp8';
const MAX_PROMPT_LENGTH = 4000;

export async function onRequestPost(context) {
  if (!context.env?.AI || typeof context.env.AI.run !== 'function') {
    return Response.json(
      { error: 'Workers AI is not configured for this Pages environment yet.' },
      { status: 503 },
    );
  }

  let body;
  try {
    body = await context.request.json();
  } catch {
    return Response.json({ error: 'Request body must be valid JSON.' }, { status: 400 });
  }

  const prompt = typeof body?.prompt === 'string' ? body.prompt.trim() : '';
  if (!prompt || prompt.length > MAX_PROMPT_LENGTH) {
    return Response.json(
      { error: `prompt must be a non-empty string of at most ${MAX_PROMPT_LENGTH} characters.` },
      { status: 400 },
    );
  }

  try {
    const result = await context.env.AI.run(MODEL, { prompt });
    return Response.json({ model: MODEL, result });
  } catch (error) {
    console.error('Workers AI request failed', error instanceof Error ? error.message : error);
    return Response.json({ error: 'Workers AI request failed.' }, { status: 502 });
  }
}

export function onRequest(context) {
  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: { Allow: 'POST, OPTIONS' },
    });
  }
  return Response.json({ error: 'Method not allowed. Use POST /api/ai.' }, {
    status: 405,
    headers: { Allow: 'POST, OPTIONS' },
  });
}
