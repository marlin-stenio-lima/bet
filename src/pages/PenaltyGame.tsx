import React, { useState, useEffect } from 'react';
import { ArrowLeft, Loader2, Trophy, Coins, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PenaltyGame() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(() => {
    return Number(localStorage.getItem('user_balance')) || 50; // Começa com 50 de simulação
  });

  const [betAmount, setBetAmount] = useState<number>(10);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'result'>('idle');
  const [multiplier, setMultiplier] = useState<number>(1);
  const [consecutiveGoals, setConsecutiveGoals] = useState<number>(0);
  const [actionMessage, setActionMessage] = useState<string>('FAÇA SUA APOSTA');
  const [goalkeeperPos, setGoalkeeperPos] = useState<'center' | 'left' | 'right'>('center');
  const [ballPos, setBallPos] = useState<'center' | 'left' | 'right'>('center');
  const [isGoal, setIsGoal] = useState<boolean>(false);

  // Sync balance with localStorage
  useEffect(() => {
    localStorage.setItem('user_balance', balance.toString());
  }, [balance]);

  const MULTIPLIERS = [1.0, 1.92, 3.68, 7.00, 14.00];

  const handleStartGame = () => {
    if (betAmount > balance) {
      alert('Saldo insuficiente!');
      return;
    }
    setBalance(prev => prev - betAmount);
    setGameState('playing');
    setMultiplier(MULTIPLIERS[1]);
    setConsecutiveGoals(0);
    setGoalkeeperPos('center');
    setBallPos('center');
    setActionMessage('ESCOLHA UM CANTO PARA CHUTAR');
  };

  const handleKick = (direction: 'left' | 'right') => {
    if (gameState !== 'playing') return;

    // --- A REGRA DO CASINO ---
    // 1. Calcula qual seria o prêmio se ele acertar agora
    const nextMultiplier = MULTIPLIERS[consecutiveGoals + 1] || MULTIPLIERS[MULTIPLIERS.length - 1];
    const potentialWin = betAmount * nextMultiplier;
    const projectedBalance = balance + potentialWin;

    let willScore = Math.random() > 0.4; // 60% chance base de fazer gol

    // A TRAVA DE QUASE-SAQUE: Se o prêmio fizer ele passar de R$ 100, ele PERDE 100% das vezes.
    if (projectedBalance >= 100) {
      willScore = false;
    }

    // A TRAVA DO CRASH: Acertar muitos seguidos diminui a chance drasticamente
    if (consecutiveGoals >= 2) {
      willScore = Math.random() > 0.8; // Apenas 20% de chance no 3º chute
    }
    
    // --- FIM DA REGRA ---

    setBallPos(direction);

    if (willScore) {
      // Goleiro pula pro lado errado ou fica no meio
      setGoalkeeperPos(direction === 'left' ? 'right' : 'left');
      setIsGoal(true);
      setConsecutiveGoals(prev => prev + 1);
      setGameState('result');
      setActionMessage('GOOOL! SAQUE OU CHUTE NOVAMENTE');
    } else {
      // Goleiro defende
      setGoalkeeperPos(direction);
      setIsGoal(false);
      setGameState('result');
      setActionMessage('DEFENDEU! VOCÊ PERDEU.');
    }
  };

  const handleCashout = () => {
    if (gameState !== 'result' || !isGoal) return;
    
    const wonAmount = betAmount * MULTIPLIERS[consecutiveGoals];
    setBalance(prev => prev + wonAmount);
    setGameState('idle');
    setConsecutiveGoals(0);
    setMultiplier(1);
    setBallPos('center');
    setGoalkeeperPos('center');
    setActionMessage('SAQUE REALIZADO! JOGUE NOVAMENTE.');
  };

  const handleNextKick = () => {
    if (consecutiveGoals >= MULTIPLIERS.length - 1) {
      handleCashout(); // Força o cashout se chegou no máximo
      return;
    }
    setGameState('playing');
    setMultiplier(MULTIPLIERS[consecutiveGoals + 1]);
    setBallPos('center');
    setGoalkeeperPos('center');
    setActionMessage('CHUTE NOVAMENTE PARA MULTIPLICAR!');
  };

  const resetGame = () => {
    setGameState('idle');
    setConsecutiveGoals(0);
    setMultiplier(1);
    setBallPos('center');
    setGoalkeeperPos('center');
    setActionMessage('FAÇA SUA APOSTA');
  };

  return (
    <div className="min-h-screen bg-[#071b0f] text-white font-sans flex flex-col items-center pt-8 px-4 pb-20">
      
      {/* Header com Saldo */}
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <button onClick={() => navigate('/')} className="p-2 bg-white/10 rounded-full hover:bg-white/20">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex items-center gap-2 bg-[#02A473]/20 border border-[#02A473]/50 px-4 py-2 rounded-full">
          <Coins className="w-4 h-4 text-[#FFDF00]" />
          <span className="font-black text-[#FFDF00]">R$ {balance.toFixed(2)}</span>
        </div>
      </div>

      <div className="w-full max-w-md text-center mb-6">
        <h1 className="text-3xl font-black italic tracking-tighter text-[#FFDF00] uppercase drop-shadow-lg">
          Penalty Bet
        </h1>
        <p className="text-gray-400 text-sm font-medium mt-1 uppercase tracking-widest">
          A casa dos R$ 100
        </p>
      </div>

      {/* Tela do Jogo */}
      <div className="w-full max-w-md aspect-square bg-[#0a3017] rounded-[40px] border border-white/10 overflow-hidden relative shadow-2xl mb-6">
        {/* Fundo do Campo (Grama) */}
        <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(0deg,transparent,transparent_20px,rgba(255,255,255,0.03)_20px,rgba(255,255,255,0.03)_40px)]"></div>
        
        {/* Trave do Gol */}
        <div className="absolute top-[10%] left-[15%] right-[15%] h-[40%] border-t-8 border-l-8 border-r-8 border-white/80 rounded-t-lg z-10"></div>
        <div className="absolute top-[10%] left-[15%] right-[15%] h-[40%] bg-[url('https://www.transparenttextures.com/patterns/net.png')] opacity-30 z-0"></div>

        {/* Estilos para animação do goleiro */}
        <style>
          {`
            @keyframes idleGoalkeeper {
              0%, 100% { transform: translateX(-50%) translateX(-15px); }
              50% { transform: translateX(-50%) translateX(15px); }
            }
            .animate-idle {
              animation: idleGoalkeeper 2s ease-in-out infinite;
            }
          `}
        </style>

        {/* Goleiro */}
        <div className={`absolute top-[25%] w-24 h-24 transition-all duration-300 z-20 flex items-center justify-center
          ${goalkeeperPos === 'center' ? 'left-1/2 -translate-x-1/2 animate-idle' : ''}
          ${goalkeeperPos === 'left' ? 'left-[25%] -translate-x-1/2 rotate-[-45deg] scale-110' : ''}
          ${goalkeeperPos === 'right' ? 'left-[75%] -translate-x-1/2 rotate-[45deg] scale-110' : ''}
        `}>
          <img src="/goalkeeper.png" alt="Goleiro" className="w-full h-full object-contain drop-shadow-2xl" />
        </div>

        {/* Bola */}
        <div className={`absolute w-8 h-8 bg-white rounded-full shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.5)] z-30 transition-all duration-500
          ${ballPos === 'center' ? 'bottom-[10%] left-1/2 -translate-x-1/2 scale-100' : ''}
          ${ballPos === 'left' ? 'bottom-[35%] left-[25%] -translate-x-1/2 scale-50' : ''}
          ${ballPos === 'right' ? 'bottom-[35%] left-[75%] -translate-x-1/2 scale-50' : ''}
        `}>
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')] opacity-20 rounded-full"></div>
        </div>

        {/* Mensagem de Ação */}
        <div className="absolute bottom-[2%] left-0 w-full text-center z-40">
           <span className="bg-black/80 text-[#FFDF00] px-4 py-2 rounded-full text-[11px] font-black tracking-widest uppercase backdrop-blur-sm border border-[#FFDF00]/30">
             {actionMessage}
           </span>
        </div>
      </div>

      {/* Controles */}
      <div className="w-full max-w-md bg-white/5 rounded-[32px] p-6 border border-white/10 backdrop-blur-md">
        
        {/* Status Multiplicador */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Multiplicador Atual</span>
            <span className="text-3xl font-black text-[#02A473]">{MULTIPLIERS[consecutiveGoals].toFixed(2)}x</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Prêmio Atual</span>
            <span className="text-2xl font-black text-white">R$ {(betAmount * MULTIPLIERS[consecutiveGoals]).toFixed(2)}</span>
          </div>
        </div>

        {gameState === 'idle' && (
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Valor da Aposta</label>
              <div className="flex gap-2">
                {[5, 10, 20, 50].map(val => (
                  <button 
                    key={val}
                    onClick={() => setBetAmount(val)}
                    className={`flex-1 py-3 rounded-xl font-black text-sm border transition-colors ${betAmount === val ? 'bg-[#02A473] border-[#02A473] text-white' : 'bg-black/30 border-white/10 text-gray-400'}`}
                  >
                    R$ {val}
                  </button>
                ))}
              </div>
            </div>
            <button 
              onClick={handleStartGame}
              className="w-full bg-[#FFDF00] hover:bg-[#FFDF00]/90 text-black py-4 rounded-2xl font-black uppercase tracking-wider text-lg shadow-[0_0_20px_rgba(255,223,0,0.3)] transition-all"
            >
              INICIAR JOGO
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="flex gap-4">
            <button 
              onClick={() => handleKick('left')}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black uppercase tracking-wider text-base shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all border border-blue-400"
            >
              CHUTAR ESQUERDA
            </button>
            <button 
              onClick={() => handleKick('right')}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black uppercase tracking-wider text-base shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all border border-blue-400"
            >
              CHUTAR DIREITA
            </button>
          </div>
        )}

        {gameState === 'result' && isGoal && (
          <div className="flex gap-4">
            <button 
              onClick={handleCashout}
              className="flex-1 bg-[#02A473] hover:bg-[#02A473]/80 text-white py-4 rounded-2xl font-black uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(2,164,115,0.4)] transition-all border border-[#02A473]"
            >
              SACAR R$ {(betAmount * MULTIPLIERS[consecutiveGoals]).toFixed(2)}
            </button>
            <button 
              onClick={handleNextKick}
              className="flex-1 bg-[#FFDF00] hover:bg-[#FFDF00]/90 text-black py-4 rounded-2xl font-black uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(255,223,0,0.3)] transition-all"
            >
              CHUTAR {MULTIPLIERS[consecutiveGoals + 1]}x
            </button>
          </div>
        )}

        {gameState === 'result' && !isGoal && (
          <button 
            onClick={resetGame}
            className="w-full bg-red-600 hover:bg-red-500 text-white py-4 rounded-2xl font-black uppercase tracking-wider text-lg shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all"
          >
            TENTAR NOVAMENTE
          </button>
        )}
      </div>

    </div>
  );
}
