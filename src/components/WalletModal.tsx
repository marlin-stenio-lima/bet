import { useState } from 'react';
import { X, Wallet, ArrowDownCircle, CheckCircle, AlertTriangle } from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  onWithdraw: (amount: number) => void;
}

export default function WalletModal({ isOpen, onClose, balance, onWithdraw }: WalletModalProps) {
  const [withdrawStep, setWithdrawStep] = useState<1 | 2 | 3>(1); // 1 = carteira, 2 = form pix, 3 = sucesso
  const [pixKey, setPixKey] = useState('');

  if (!isOpen) return null;

  const handleWithdrawClick = () => {
    if (balance < 100) {
      alert("O valor mínimo para saque é R$ 100,00.");
    } else {
      setWithdrawStep(2);
    }
  };

  const handleConfirmWithdraw = () => {
    if (!pixKey) {
      alert("Por favor, preencha sua chave PIX.");
      return;
    }
    // Sucesso no saque
    onWithdraw(balance); // Saca tudo
    setWithdrawStep(3);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#0a2213] border border-[#02A473]/30 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#ffffff10]">
          <h2 className="text-white font-black flex items-center gap-2">
            <Wallet className="w-5 h-5 text-[#FFDF00]" />
            MINHA CARTEIRA
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {withdrawStep === 1 && (
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2 font-bold uppercase tracking-wider">Saldo Disponível</p>
              <h3 className="text-4xl font-black text-white mb-8">
                R$ {balance.toFixed(2).replace('.', ',')}
              </h3>

              <div className="bg-[#ffffff05] rounded-xl p-4 mb-6 border border-[#ffffff10]">
                <div className="flex items-center gap-3 text-left">
                  <AlertTriangle className="w-6 h-6 text-[#FFDF00] shrink-0" />
                  <p className="text-xs text-gray-300">
                    O valor mínimo para saque é de <strong>R$ 100,00</strong>. Certifique-se de ter saldo suficiente antes de solicitar.
                  </p>
                </div>
              </div>

              <button 
                onClick={handleWithdrawClick}
                className="w-full bg-[#02A473] hover:bg-[#028b61] text-white font-bold text-lg py-4 rounded-xl transition-colors shadow-lg shadow-[#02A473]/20 flex justify-center items-center gap-2"
              >
                <ArrowDownCircle className="w-5 h-5" /> SOLICITAR SAQUE
              </button>
            </div>
          )}

          {withdrawStep === 2 && (
            <div>
              <p className="text-white text-center font-bold mb-6">
                Você está sacando: <span className="text-[#02A473]">R$ {balance.toFixed(2).replace('.', ',')}</span>
              </p>
              
              <label className="block text-sm font-bold text-white mb-2">Informe sua Chave PIX:</label>
              <input 
                type="text" 
                value={pixKey}
                onChange={(e) => setPixKey(e.target.value)}
                placeholder="CPF, E-mail, Celular ou Aleatória"
                className="w-full bg-[#ffffff10] border border-[#ffffff20] focus:border-[#02A473] rounded-xl py-3 px-4 text-white font-bold text-sm focus:outline-none transition-colors mb-6"
              />

              <div className="flex gap-3">
                <button 
                  onClick={() => setWithdrawStep(1)}
                  className="flex-1 bg-transparent border border-[#ffffff30] text-white font-bold py-3.5 rounded-xl hover:bg-[#ffffff10] transition-colors"
                >
                  Voltar
                </button>
                <button 
                  onClick={handleConfirmWithdraw}
                  className="flex-1 bg-[#02A473] hover:bg-[#028b61] text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-[#02A473]/20"
                >
                  Confirmar Saque
                </button>
              </div>
            </div>
          )}

          {withdrawStep === 3 && (
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-[#02A473]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-[#02A473]" />
              </div>
              <h3 className="text-xl font-black text-white mb-2">Saque em Análise!</h3>
              <p className="text-gray-400 text-sm mb-8">
                Sua solicitação foi recebida e está em processamento. O valor cairá na sua conta em até 2 horas úteis.
              </p>
              <button 
                onClick={onClose}
                className="w-full bg-[#ffffff10] hover:bg-[#ffffff20] text-white font-bold py-4 rounded-xl transition-colors"
              >
                Voltar para o Início
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
