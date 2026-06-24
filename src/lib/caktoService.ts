export interface CaktoCustomer {
  name: string;
  email: string;
  docNumber: string;
  phone: string;
}

export interface CaktoPixResponse {
  success: boolean;
  qrCode?: string;
  qrCodeBase64?: string;
  checkoutUrl?: string;
  error?: string;
}

export const generateCaktoPix = async (
  amount: number,
  customer: CaktoCustomer
): Promise<CaktoPixResponse> => {
  const clientId = import.meta.env.VITE_CAKTO_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CAKTO_CLIENT_SECRET;
  const productId = import.meta.env.VITE_CAKTO_PRODUCT_ID;
  
  const offerMap: Record<number, string> = {
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

  try {
    if (!clientId || !clientSecret) {
      return { success: false, error: 'Credenciais ausentes. Configure VITE_CAKTO_CLIENT_ID e VITE_CAKTO_CLIENT_SECRET no .env' };
    }

    if (!productId || !offerId) {
      return { success: false, error: `Offer ID não encontrado para o valor R$${amount} ou Product ID ausente.` };
    }

    // 1. Obter Token (SEM grant_type — a Cakto rejeita esse campo)
    const tokenResponse = await fetch('/api/cakto/public_api/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json().catch(() => ({}));
      console.error('Cakto Auth Error:', errorData);
      return { success: false, error: `Falha na autenticação Cakto: ${JSON.stringify(errorData) || tokenResponse.statusText}` };
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 2. Criar Cobrança Pix (com productId e items obrigatórios)
    const idempotencyKey = crypto.randomUUID();
    const payload = {
      paymentMethod: 'pix',
      items: [
        {
          offerId: offerId,
          quantity: 1,
          offerType: 'main'
        }
      ],
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

    const paymentResponse = await fetch('/api/cakto/public_api/payments/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'X-Idempotency-Key': idempotencyKey
      },
      body: JSON.stringify(payload)
    });

    if (!paymentResponse.ok) {
      const errData = await paymentResponse.json().catch(() => ({}));
      console.error('Cakto Payment Error:', errData);
      return { success: false, error: `Erro ao gerar Pix Cakto: ${JSON.stringify(errData)}` };
    }

    const paymentData = await paymentResponse.json();
    
    return {
      success: true,
      qrCode: paymentData.pix?.qrCode,
      qrCodeBase64: paymentData.pix?.qrCodeBase64,
      checkoutUrl: paymentData.checkoutUrl
    };

  } catch (error: any) {
    console.error('Erro geral Cakto:', error);
    return { success: false, error: `Erro na comunicação com a API Cakto: ${error.message}` };
  }
};
