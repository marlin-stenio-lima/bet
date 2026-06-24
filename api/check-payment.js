export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Transaction ID is required' });
  }

  const clientId = process.env.VITE_CAKTO_CLIENT_ID || process.env.CAKTO_CLIENT_ID;
  const clientSecret = process.env.VITE_CAKTO_CLIENT_SECRET || process.env.CAKTO_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(500).json({ success: false, error: 'Configuração do servidor incompleta.' });
  }

  try {
    // 1. Get Token
    const tokenResponse = await fetch('https://api.cakto.com.br/public_api/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    if (!tokenResponse.ok) {
      return res.status(401).json({ success: false, error: 'Falha na autenticação da Cakto.' });
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 2. Fetch Order Status
    const orderResponse = await fetch(`https://api.cakto.com.br/public_api/orders/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!orderResponse.ok) {
      return res.status(400).json({ success: false, error: 'Erro ao buscar pedido na Cakto.' });
    }

    const orderData = await orderResponse.json();

    return res.status(200).json({
      success: true,
      status: orderData.status,
      isPaid: orderData.status === 'paid' || orderData.status === 'approved'
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
