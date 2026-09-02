import { onRequestPost as handleContact } from "./api/contact.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Route POST requests to /api/contact to your contact handler
    if (url.pathname === "/api/contact" && request.method === "POST") {
      return handleContact({ request, env, ctx });
    }

    // Otherwise, serve static assets (your Vite frontend)
    return env.ASSETS.fetch(request);
  },
};