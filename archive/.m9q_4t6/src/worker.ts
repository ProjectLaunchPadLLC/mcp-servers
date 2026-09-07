import InfoWeaveServer from "./server";

const server = new InfoWeaveServer();

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });
}

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== "POST") {
      return jsonResponse({ error: "Method Not Allowed" }, 405);
    }

    const { pathname } = new URL(request.url);
    if (pathname !== "/execute") {
      return jsonResponse({ error: "Not Found" }, 404);
    }

    try {
      const body = (await request.json()) as { prompt?: unknown };
      if (typeof body.prompt !== "string" || !body.prompt.trim()) {
        return jsonResponse({ error: "Field 'prompt' must be a non-empty string." }, 400);
      }

      const workflow = await server.execute(body.prompt);
      return jsonResponse({ workflow });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unexpected server error.";
      return jsonResponse({ error: message }, 500);
    }
  },
};
