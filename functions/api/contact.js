export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const { name, email, service, message } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Please fill out all required fields." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const token = env.TELEGRAM_BOT_TOKEN;
    const chatId = env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return new Response(
        JSON.stringify({
          error: "Telegram bot token or Chat ID missing in Cloudflare settings.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const escapeHtml = (val) =>
      String(val || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

    const text = [
      "📨 <b>New inquiry — nhom.me</b>",
      "",
      `<b>Name:</b> ${escapeHtml(name)}`,
      `<b>Email:</b> ${escapeHtml(email)}`,
      `<b>Service:</b> ${escapeHtml(service)}`,
      "",
      "<b>Message:</b>",
      escapeHtml(message),
    ].join("\n");

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "HTML",
      }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.ok) {
      return new Response(
        JSON.stringify({
          error: data?.description || `Telegram error status ${res.status}`,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Failed to submit message." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
