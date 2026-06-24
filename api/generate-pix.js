export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, customer } = req.body;
  
  // Use server-side environment variables
  // Support both VITE_ prefixed (since user already added them) and non-prefixed
  const clientId = process.env.VITE_CAKTO_CLIENT_ID || process.env.CAKTO_CLIENT_ID;
  const clientSecret = process.env.VITE_CAKTO_CLIENT_SECRET || process.env.CAKTO_CLIENT_SECRET;
  const productId = process.env.VITE_CAKTO_PRODUCT_ID || process.env.CAKTO_PRODUCT_ID;

  if (!clientId || !clientSecret || !productId) {
    return res.status(500).json({ success: false, error: 'Configuração do servidor incompleta (chaves ausentes).' });
  }

  const offerMap = {
    10: '7pmtcuw',
    20: 'qxd2iha',
    30: '3242qcp',
    40: '3brf7e5',
    50: 'o82tcmr',
    70: 'e8byw6i',
    100: 'mbteqf2',
    200: '8x6tx2f'
  };

  const offerId = offerMap[amount];
  if (!offerId) {
    return res.status(400).json({ success: false, error: 'Valor inválido.' });
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
      const errText = await tokenResponse.text();
      return res.status(401).json({ success: false, error: `Falha na autenticação da Cakto.`, details: errText });
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 2. Generate Pix
    const idempotencyKey = crypto.randomUUID();
    const payload = {
      paymentMethod: 'pix',
      items: [{ offerId: offerId, quantity: 1, offerType: 'main' }],
      customer: {
        name: customer.name,
        email: customer.email,
        docType: 'cpf',
        docNumber: customer.docNumber.replace(/\D/g, ''),
        phone: customer.phone.replace(/\D/g, '') || '5511999999999',
        fingerprint: crypto.randomUUID()
      },
      pixExpiresIn: 300
    };

    const paymentResponse = await fetch('https://api.cakto.com.br/public_api/payments/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'X-Idempotency-Key': idempotencyKey
      },
      body: JSON.stringify(payload)
    });

    if (!paymentResponse.ok) {
      const errText = await paymentResponse.text();
      return res.status(400).json({ success: false, error: 'Erro ao gerar pagamento.', details: errText });
    }

    const paymentData = await paymentResponse.json();

    return res.status(200).json({
      success: true,
      qrCode: paymentData.pix?.qrCode,
      qrCodeBase64: paymentData.pix?.qrCodeBase64,
      checkoutUrl: paymentData.checkoutUrl
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
