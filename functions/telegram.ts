import { json, error } from '@cloudflare/worker-types';

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  // Get token & chat id from environment variables (set in Cloudflare Pages)
  const BOT_TOKEN = env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    return error(500, 'Telegram credentials not configured');
  }

  // Parse the incoming JSON payload from the client
  const payload = await request.json().catch(() => ({}));

  // Build the Telegram payload
  const telegramPayload = {
    chat_id: CHAT_ID,
    text: payload.text,
    parse_mode: 'HTML',
  };

  // Forward the request to Telegram (server‑side, no CORS)
  const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(telegramPayload),
  });

  const tgData = await tgRes.json();

  if (!tgRes.ok) {
    return error(tgRes.status, tgData?.description ?? 'Telegram error');
  }

  return json({ ok: true });
};