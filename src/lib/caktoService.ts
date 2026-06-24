export interface CaktoCustomer {
  name: string;
  email: string;
  docNumber: string;
  phone: string;
}

export interface CaktoPixResponse {
  success: boolean;
  transactionId?: string;
  qrCode?: string;
  qrCodeBase64?: string;
  checkoutUrl?: string;
  error?: string;
}

export const generateCaktoPix = async (
  amount: number,
  customer: CaktoCustomer
): Promise<CaktoPixResponse> => {
  try {
    const response = await fetch('/api/generate-pix', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount, customer })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.error('Server API Error:', errData);
      return { success: false, error: errData.error || `Erro interno no servidor: ${response.status}` };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Network/Client Error:', error);
    return { success: false, error: `Erro de conexão: ${error.message}` };
  }
};

export const checkPaymentStatus = async (transactionId: string): Promise<boolean> => {
  try {
    const response = await fetch(`/api/check-payment?id=${transactionId}`);
    if (!response.ok) return false;
    
    const data = await response.json();
    return data.isPaid === true;
  } catch (err) {
    console.error('Error checking payment:', err);
    return false;
  }
};
