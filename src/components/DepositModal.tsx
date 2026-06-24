import { useState, useEffect } from 'react';
import { X, ArrowLeft, Copy, AlertTriangle, Loader2 } from 'lucide-react';
import { generateCaktoPix, checkPaymentStatus } from '../lib/caktoService';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDepositSuccess: (amount: number) => void;
}

export default function DepositModal({ isOpen, onClose, onDepositSuccess }: DepositModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [amount, setAmount] = useState<number>(50);
  const [cpf, setCpf] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [timeLeft, setTimeLeft] = useState(293); // 4:53
  const [loading, setLoading] = useState(false);
  const [pixData, setPixData] = useState<any>(null);
  
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setAmount(50);
      setPixData(null);
      setTimeLeft(293);
    }
  }, [isOpen]);

  useEffect(() => {
    let timer: any;
    if (step === 2 && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  // Polling para checar status do pagamento na Cakto
  useEffect(() => {
    let pollTimer: any;
    if (step === 2 && pixData?.transactionId) {
      pollTimer = setInterval(async () => {
        const isPaid = await checkPaymentStatus(pixData.transactionId);
        if (isPaid) {
          clearInterval(pollTimer);
          onDepositSuccess(amount);
        }
      }, 5000); // Check every 5 seconds
    }
    return () => clearInterval(pollTimer);
  }, [step, pixData, amount, onDepositSuccess]);

  if (!isOpen) return null;

  const handleDeposit = async () => {
    if (!name || !cpf || !phone) {
      alert("Por favor, preencha todos os dados (Nome, CPF e Telefone) para gerar o Pix na Cakto.");
      return;
    }

    setLoading(true);

    const fakeEmail = `cliente_${cpf.replace(/\D/g, '') || Math.floor(Math.random() * 100000)}@meuemail.com`;

    try {
      const response = await generateCaktoPix(amount, {
        name: name,
        email: fakeEmail,
        docNumber: cpf,
        phone: phone
      });

      if (response.success && response.qrCode) {
        setPixData(response);
        setStep(2);
        setTimeLeft(293);
      } else {
        alert(response.error || "Erro ao gerar PIX na Cakto.");
      }
    } catch (err) {
      alert("Erro de comunicação com a Cakto.");
    } finally {
      setLoading(false);
    }
  };

  const copyPix = () => {
    if (pixData?.qrCode) {
      navigator.clipboard.writeText(pixData.qrCode);
      alert("Código copiado com sucesso!");
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#141d18] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-white/5 relative mx-4">
        
        {/* Step 1: Amount Selection */}
        {step === 1 && (
          <div className="p-8">
            <button onClick={onClose} className="absolute top-5 right-5 text-gray-500 hover:text-white bg-[#ffffff05] hover:bg-[#ffffff10] p-2 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex flex-col items-center mb-8">
              <div className="w-12 h-12 bg-[#02A473]/10 text-[#02A473] rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">❖</span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">Depósito via PIX</h2>
              <p className="text-sm text-gray-400 mt-1">Preencha os dados para gerar o QR Code</p>
            </div>

            <div className="mb-6 space-y-4">
              <div>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome Completo"
                  className="w-full bg-[#ffffff05] border border-[#ffffff10] focus:border-[#02A473] rounded-xl py-4 px-5 text-white font-medium text-sm focus:outline-none transition-colors"
                />
              </div>
              <div>
                <input 
                  type="text" 
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="CPF (apenas números)"
                  className="w-full bg-[#ffffff05] border border-[#ffffff10] focus:border-[#02A473] rounded-xl py-4 px-5 text-white font-medium text-sm focus:outline-none transition-colors"
                />
              </div>
              <div>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Telefone (com DDD)"
                  className="w-full bg-[#ffffff05] border border-[#ffffff10] focus:border-[#02A473] rounded-xl py-4 px-5 text-white font-medium text-sm focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-300 mb-3 ml-1">Valor a depositar:</label>
              
              <div className="grid grid-cols-4 gap-2">
                {[10, 20, 30, 40, 50, 70, 100, 200].map(val => (
                  <button
                    key={val}
                    onClick={() => setAmount(val)}
                    className={`py-2.5 rounded-lg border font-bold text-[11px] transition-all flex items-center justify-center ${amount === val ? 'bg-[#02A473] border-[#02A473] text-white' : 'bg-[#ffffff05] border-[#ffffff10] text-gray-400 hover:bg-[#ffffff10] hover:text-white'}`}
                  >
                    R$ {val}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleDeposit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#02A473] to-[#028b61] hover:from-[#028b61] hover:to-[#016848] text-white font-black text-lg py-4.5 rounded-full transition-all active:scale-95 shadow-[0_8px_25px_rgba(2,164,115,0.4)] disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> GERANDO PIX...</> : "DEPOSITAR AGORA"}
            </button>
          </div>
        )}

        {/* Step 2: QR Code */}
        {step === 2 && (
          <div className="p-8">
            <button onClick={onClose} className="absolute top-5 right-5 text-gray-500 hover:text-white bg-[#ffffff05] hover:bg-[#ffffff10] p-2 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <button onClick={() => setStep(1)} className="text-gray-400 hover:text-white transition-colors bg-[#ffffff05] p-2 rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-black text-white tracking-tight">Pagar via PIX</h2>
            </div>
            
            <div className="text-center mb-2">
              <p className="text-[13px] text-gray-400 mb-6 leading-relaxed">Abra o aplicativo do seu banco e escaneie o código abaixo ou clique em copiar.</p>
              
              {/* QR Code Box */}
              <div className="bg-white p-4 rounded-3xl inline-block mx-auto mb-6 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                {pixData?.qrCodeBase64 ? (
                  <img src={pixData.qrCodeBase64.startsWith('http') || pixData.qrCodeBase64.startsWith('data:') ? pixData.qrCodeBase64 : `data:image/png;base64,${pixData.qrCodeBase64}`} alt="QR Code PIX" className="w-48 h-48 object-contain" />
                ) : pixData?.qrCode ? (
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(pixData.qrCode)}`} alt="QR Code PIX" className="w-48 h-48 object-contain" />
                ) : (
                  <div className="w-48 h-48 flex items-center justify-center bg-gray-50 rounded-2xl border border-gray-100">
                    <Loader2 className="w-8 h-8 animate-spin text-[#02A473]" />
                  </div>
                )}
              </div>
              
              <div className="bg-[#b3751e]/10 border border-[#b3751e]/30 text-[#e69b33] text-[11px] p-3.5 rounded-xl flex items-start gap-2 text-left mb-6 font-medium">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="leading-relaxed">Depósitos aceitos apenas de contas com o <strong className="text-[#f5a623]">mesmo CPF</strong> do titular.</p>
              </div>

              {/* Copy Pix Area */}
              <div className="border-2 border-dashed border-[#02A473]/30 rounded-3xl p-5 bg-[#02A473]/5 relative mb-6 group hover:border-[#02A473]/50 transition-colors">
                <div className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1">VALOR DO DEPÓSITO</div>
                <div className="text-[36px] font-black text-[#02A473] mb-4 tracking-tighter">R$ {amount.toFixed(2).replace('.', ',')}</div>
                
                <div className="bg-[#0b120f] rounded-xl py-3 px-4 flex justify-between items-center overflow-hidden mb-4 border border-white/5">
                  <span className="text-[11px] text-gray-500 truncate mr-2 font-mono">
                    {pixData?.qrCode || "Gerando..."}
                  </span>
                </div>
                
                <button 
                  onClick={copyPix} 
                  className="w-full bg-gradient-to-r from-[#02A473] to-[#028b61] hover:from-[#028b61] hover:to-[#016848] text-white font-black text-[13px] py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_4px_15px_rgba(2,164,115,0.3)] active:scale-95 uppercase tracking-wide"
                >
                  <Copy className="w-4 h-4" /> Copiar Código Pix
                </button>
              </div>

              {/* Timer & Status */}
              <div className="flex items-center justify-between bg-[#ffffff05] border border-[#ffffff10] rounded-xl px-5 py-3 mb-4">
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Vencimento em</span>
                  <span className="text-xl font-black text-white tabular-nums">{formatTime(timeLeft)}</span>
                </div>
                <div className="flex items-center gap-2 text-[#02A473] bg-[#02A473]/10 px-3 py-1.5 rounded-full">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span className="text-[10px] font-black uppercase tracking-wider">Aguardando</span>
                </div>
              </div>

              {/* Botão de Teste Oculto */}
              {onDepositSuccess && (
                <button 
                  onClick={() => {
                    onDepositSuccess(amount);
                    onClose();
                  }}
                  className="text-gray-600 hover:text-gray-400 font-medium text-[10px] underline transition-colors mt-2"
                >
                  Simular Pagamento Aprovado (Dev)
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
