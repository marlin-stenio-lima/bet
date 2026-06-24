import { useState } from 'react';
import { ArrowRight, Wallet } from 'lucide-react';
import DepositModal from '../components/DepositModal';
import WalletModal from '../components/WalletModal';

export default function BrasilHaitiBet() {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState<'escocia' | 'empate' | 'brasil' | null>('escocia'); // Initialized to escocia to match screenshot, wait, they clicked escocia

  const getOddValue = () => {
    if (selectedTeam === 'escocia') return '2.00';
    if (selectedTeam === 'empate') return '10.00';
    if (selectedTeam === 'brasil') return '20.00';
    return '20.00';
  };

  const handleDepositSuccess = (amount: number) => {
    setBalance(prev => prev + amount);
  };

  const handleWithdraw = (amount: number) => {
    // Saca o valor e zera o saldo
    setBalance(prev => prev - amount);
  };

  return (
    <div className="min-h-screen text-gray-200 font-sans flex flex-col relative pb-12 bg-[#071b0f]">
      
      {/* Fundo Estádio */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1518605368461-1e125222048c?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.5
        }}
      />
      
      {/* Overlay para dar contraste */}
      <div className="fixed inset-0 z-0 bg-[#071b0f]/50 pointer-events-none backdrop-blur-[2px]" />

      {/* HEADER */}
      <header className="relative z-10 w-full max-w-md mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[#FFDF00] font-black text-xl tracking-tight leading-none mb-1 flex items-center gap-1.5">
            <span className="text-white">ESCÓCIA</span> x BRASIL
          </span>
          <span className="text-gray-300 text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> HOJE, 19:00
          </span>
        </div>

        <button 
          onClick={() => setIsWalletModalOpen(true)}
          className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors"
        >
          <Wallet className="w-4 h-4 text-[#FFDF00]" />
          <span className="text-white font-bold text-sm">R$ {balance.toFixed(2).replace('.', ',')}</span>
        </button>
      </header>

      {/* CONTEÚDO PRINCIPAL (MOBILE FIRST) */}
      <main className="relative z-10 w-full max-w-md mx-auto px-4 flex flex-col items-center">
        
        {/* Título */}
        <div className="flex flex-col items-center text-center mb-6 pt-4">
          <div className="bg-white/10 backdrop-blur-md border border-[#FFDF00]/30 px-4 py-1.5 rounded-full mb-4 inline-flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[#FFDF00] rounded-full shadow-[0_0_8px_rgba(255,223,0,0.8)]"></div>
            <span className="text-[#FFDF00] text-[11px] font-black tracking-[0.2em]">APOSTAS ESPECIAIS</span>
          </div>

          <div className="text-gray-200 text-xs font-bold tracking-widest mb-1 drop-shadow-md">COPA DO MUNDO DA FIFA 2026™</div>
          <div className="text-gray-300 text-xs mb-2 drop-shadow-md">Hoje, 19:00 • Fase de grupos - Grupo C</div>
          
          <h1 className="text-[32px] font-black tracking-tight mb-2 flex items-center gap-2 drop-shadow-lg">
            <span className="text-white">ESCÓCIA</span> <span className="text-[#FFDF00] text-2xl font-light mx-1">x</span> <span className="text-[#FFDF00]">BRASIL</span>
          </h1>
          
          <p className="text-gray-100 text-[13px] px-6 leading-relaxed mt-2 font-medium drop-shadow-md">
            Mercado exclusivo. <strong className="text-[#FFDF00]">Aposte R$1</strong> e leve <strong className="text-[#FFDF00]">R$20 em Free Bet.</strong>
          </p>
        </div>

        {/* CARD SUPER ODD (GLASSMORPHISM) */}
        <div className="w-full bg-[#0a2012]/60 backdrop-blur-2xl border border-white/10 rounded-[40px] p-6 mb-12 shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">
          
          {/* Fundo do Card (Número 20 gigante) */}
          <div className="absolute -right-8 top-10 text-white/5 font-black text-[220px] leading-none select-none pointer-events-none z-0 tracking-tighter">
            20
          </div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div className="bg-gradient-to-r from-[#FFDF00] to-[#f5b800] text-black px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-md">
                <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                <span className="text-[10px] font-black tracking-widest">SUPER ODD</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-3 py-1 rounded-full text-[10px] font-bold">
                COPA 2026
              </div>
            </div>

            <h2 className="text-[32px] font-black text-[#FFDF00] leading-[1.1] mb-4 tracking-tight drop-shadow-md">
              APOSTE R$1<br/>
              E GANHE R$20
            </h2>
            
            <p className="text-white text-[13px] mb-8 pr-2 leading-relaxed drop-shadow-md">
              Acerte o vencedor de Escócia x Brasil e receba <strong>R$20 em Free Bet</strong> direto na sua conta.
            </p>

            <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-[24px] p-5 flex gap-3 mb-8">
              <div className="w-6 h-6 bg-[#FFDF00] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-black font-black text-sm">!</span>
              </div>
              <p className="text-[12px] text-gray-200 leading-relaxed">
                <strong className="text-[#FFDF00]">Fique tranquilo:</strong> na hora de apostar vai aparecer a <strong className="text-white">odd normal</strong>. Se a sua aposta de R$1 bater, a gente turbina pra <strong className="text-[#FFDF00]">odd 20</strong> e você recebe os <strong className="text-white">R$20 em Free Bet.</strong>
              </p>
            </div>

            {/* Odd Area */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 mb-6 shadow-inner">
              
              {/* Mercado Real 1x2 */}
              <div className="mb-6">
                <div className="text-white font-bold text-[11px] uppercase tracking-wide mb-3 flex items-center justify-between px-1">
                  <span>Resultado Final</span>
                  <span className="text-gray-400 font-normal">90 Min</span>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedTeam('escocia')} 
                    className={`flex-1 flex flex-col items-center justify-center py-3 rounded-xl border transition-all ${selectedTeam === 'escocia' ? 'bg-[#02A473] border-[#02A473] shadow-[0_0_15px_rgba(2,164,115,0.4)]' : 'bg-black/40 border-white/5 hover:bg-black/60'}`}
                  >
                    <span className={`text-[11px] font-medium mb-1 ${selectedTeam === 'escocia' ? 'text-white' : 'text-gray-400'}`}>1 - Escócia</span>
                    <span className={`font-black text-base ${selectedTeam === 'escocia' ? 'text-white' : 'text-[#FFDF00]'}`}>2.00</span>
                  </button>
                  
                  <button 
                    onClick={() => setSelectedTeam('empate')} 
                    className={`flex-1 flex flex-col items-center justify-center py-3 rounded-xl border transition-all ${selectedTeam === 'empate' ? 'bg-[#02A473] border-[#02A473] shadow-[0_0_15px_rgba(2,164,115,0.4)]' : 'bg-black/40 border-white/5 hover:bg-black/60'}`}
                  >
                    <span className={`text-[11px] font-medium mb-1 ${selectedTeam === 'empate' ? 'text-white' : 'text-gray-400'}`}>X - Empate</span>
                    <span className={`font-black text-base ${selectedTeam === 'empate' ? 'text-white' : 'text-[#FFDF00]'}`}>10.00</span>
                  </button>
                  
                  <button 
                    onClick={() => setSelectedTeam('brasil')} 
                    className={`flex-1 flex flex-col items-center justify-center py-3 rounded-xl border transition-all ${selectedTeam === 'brasil' ? 'bg-[#02A473] border-[#02A473] shadow-[0_0_15px_rgba(2,164,115,0.4)]' : 'bg-black/40 border-white/5 hover:bg-black/60'}`}
                  >
                    <span className={`text-[11px] font-medium mb-1 ${selectedTeam === 'brasil' ? 'text-white' : 'text-gray-400'}`}>2 - Brasil</span>
                    <span className={`font-black text-base ${selectedTeam === 'brasil' ? 'text-white' : 'text-[#FFDF00]'}`}>20.00</span>
                  </button>
                </div>
              </div>
              
              {/* Promoção Aplicada */}
              <div className="bg-white/5 rounded-2xl p-4 text-center mb-6 border border-white/10 relative overflow-hidden backdrop-blur-sm">
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-[#FFDF00]/10 to-transparent -translate-x-full transition-all duration-1000 ${selectedTeam ? 'translate-x-full' : ''}`} />
                <div className="text-[#02A473] text-[11px] font-black tracking-[0.2em] mb-1">
                  {selectedTeam ? '✅ ODD TURBINADA APLICADA' : 'SELECIONE PARA TURBINAR'}
                </div>
                <div className={`text-[48px] font-black leading-none tracking-tighter transition-all duration-300 drop-shadow-lg ${selectedTeam ? 'text-[#FFDF00] scale-110 my-2' : 'text-gray-500'}`}>
                  {getOddValue()}
                </div>
              </div>

              <button 
                onClick={() => {
                  if (selectedTeam) {
                    setIsDepositModalOpen(true);
                  }
                }}
                disabled={!selectedTeam}
                className={`w-full font-black text-lg py-4.5 rounded-full flex items-center justify-center gap-2 transition-all ${selectedTeam ? 'bg-gradient-to-r from-[#ffe436] to-[#f5b800] hover:from-yellow-300 hover:to-yellow-500 text-black active:scale-95 shadow-[0_8px_25px_rgba(255,223,0,0.4)]' : 'bg-black/40 text-gray-500 cursor-not-allowed shadow-none border border-white/10'}`}
              >
                {selectedTeam ? `PEGAR ODD ${parseInt(getOddValue())}` : 'ESCOLHA UMA OPÇÃO'} {selectedTeam && <ArrowRight className="w-5 h-5" />}
              </button>
            </div>

            <div className="text-center text-[11px] text-gray-300 font-medium px-4 opacity-80">
              Aposta máxima R$1 • Pagamento em Free Bet • Apenas pra contas novas
            </div>
          </div>
        </div>

        {/* COMO FUNCIONA */}
        <div className="w-full mb-8">
          <h3 className="text-[#FFDF00] font-black text-center tracking-[0.3em] text-sm mb-6">COMO FUNCIONA</h3>
          
          <div className="space-y-4">
            <div className="bg-[#0a3017]/40 backdrop-blur-md border border-white/5 rounded-[32px] p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-7 h-7 bg-[#FFDF00] rounded-full flex items-center justify-center text-black font-black text-sm">1</div>
                <h4 className="text-white font-black tracking-wide text-sm">APOSTE R$1</h4>
              </div>
              <p className="text-gray-300 text-[13px] pl-10 leading-relaxed">
                Clique em Pegar Odd 20. A aposta vai abrir no Brasil pra vencer, você vai colocar R$1 mesmo com a odd normal.
              </p>
            </div>

            <div className="bg-[#0a3017]/40 backdrop-blur-md border border-white/5 rounded-[32px] p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-7 h-7 bg-[#FFDF00] rounded-full flex items-center justify-center text-black font-black text-sm">2</div>
                <h4 className="text-white font-black tracking-wide text-sm">ACOMPANHE O JOGO</h4>
              </div>
              <p className="text-gray-300 text-[13px] pl-10 leading-relaxed">
                Agora é torcer pelo Brasil! Se você colocou R$1, a sua aposta já tá validada.
              </p>
            </div>

            <div className="bg-[#0a3017]/40 backdrop-blur-md border border-white/5 rounded-[32px] p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-7 h-7 bg-[#FFDF00] rounded-full flex items-center justify-center text-black font-black text-sm">3</div>
                <h4 className="text-white font-black tracking-wide text-sm">RECEBA R$20</h4>
              </div>
              <p className="text-gray-300 text-[13px] pl-10 leading-relaxed">
                Caso o Brasil vença o jogo, você ganha a aposta normalmente e ainda recebe R$20 em Free Bet em até 24h.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 mb-8">
          <a href="#" className="text-[#FFDF00] underline mb-4 inline-block">Confira as condições da oferta clicando aqui</a>
          <p>Jogue com responsabilidade • +18 • Aposta não é investimento • BetVIP x Gabriel Zão</p>
        </div>

      </main>

      <DepositModal 
        isOpen={isDepositModalOpen} 
        onClose={() => setIsDepositModalOpen(false)} 
        onDepositSuccess={(amount) => {
          setBalance((prev) => prev + amount);
          setIsDepositModalOpen(false);
          alert(`Pagamento do Pix no valor de R$ ${amount.toFixed(2)} foi aprovado com sucesso! Saldo atualizado.`);
        }}
      />

      <WalletModal 
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        balance={balance}
        onWithdraw={handleWithdraw}
      />
    </div>
  );
}
