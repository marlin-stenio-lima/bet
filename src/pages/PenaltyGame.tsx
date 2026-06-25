import React, { useState, useEffect } from 'react';
import { ArrowLeft, Coins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PenaltyGame() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(() => {
    return Number(localStorage.getItem('user_balance')) || 5000;
  });

  const [betAmount, setBetAmount] = useState<number>(10);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'result'>('idle');
  const [multiplier, setMultiplier] = useState<number>(1);
  const [consecutiveGoals, setConsecutiveGoals] = useState<number>(0);
  const [goalkeeperPos, setGoalkeeperPos] = useState<'center' | 'left' | 'right'>('center');
  const [ballPos, setBallPos] = useState<'center' | 'left' | 'right'>('center');
  const [isGoal, setIsGoal] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('user_balance', balance.toString());
  }, [balance]);

  const MULTIPLIERS = [1.0, 1.92, 3.84, 7.68, 15.36, 30.72];

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
  };

  const handleKick = (direction: 'left' | 'right' | 'center') => {
    if (gameState !== 'playing') return;

    const nextMultiplier = MULTIPLIERS[consecutiveGoals + 1] || MULTIPLIERS[MULTIPLIERS.length - 1];
    const potentialWin = betAmount * nextMultiplier;
    const projectedBalance = balance + potentialWin;

    let willScore = Math.random() > 0.4;

    if (projectedBalance >= 100) {
      willScore = false;
    }

    if (consecutiveGoals >= 2) {
      willScore = Math.random() > 0.8;
    }

    setBallPos(direction);

    if (willScore) {
      const wrongDirs = ['left', 'center', 'right'].filter(d => d !== direction);
      setGoalkeeperPos(wrongDirs[Math.floor(Math.random() * wrongDirs.length)] as any);
      setIsGoal(true);
      setConsecutiveGoals(prev => prev + 1);
      setGameState('result');
    } else {
      setGoalkeeperPos(direction);
      setIsGoal(false);
      setGameState('result');
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
  };

  const handleNextKick = () => {
    setGameState('playing');
    setBallPos('center');
    setGoalkeeperPos('center');
  };

  const resetGame = () => {
    setGameState('idle');
    setConsecutiveGoals(0);
    setMultiplier(1);
    setBallPos('center');
    setGoalkeeperPos('center');
  };

  return (
    <div className="min-h-screen bg-[#051124] text-white font-sans flex flex-col items-center relative overflow-hidden">
      
      {/* Background Stadium */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-80"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1518605368461-1e125222048c?q=80&w=2070&auto=format&fit=crop")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#051124]/90 via-[#051124]/50 to-[#021f10]"></div>
      </div>

      {/* Spotlights */}
      <div className="absolute top-0 left-1/4 w-32 h-[600px] bg-white/10 blur-3xl rotate-[20deg] z-0"></div>
      <div className="absolute top-0 right-1/4 w-32 h-[600px] bg-white/10 blur-3xl rotate-[-20deg] z-0"></div>

      {/* Header */}
      <div className="w-full flex justify-between items-center p-4 z-10">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/')} className="p-2 bg-black/40 backdrop-blur-sm rounded-full hover:bg-white/20">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <span className="text-gray-300 font-medium text-sm tracking-widest uppercase">Penalty Shoot-Out</span>
        </div>
      </div>

      {/* Progress Bar (Multipliers) */}
      <div className="w-full max-w-md px-6 mt-4 z-10">
        <div className="w-full h-1 bg-white/20 rounded-full relative">
          <div 
            className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${(consecutiveGoals / 5) * 100}%` }}
          ></div>
          {MULTIPLIERS.slice(1).map((mult, idx) => (
            <div key={idx} className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center" style={{ left: `${((idx + 1) / 5) * 100}%` }}>
              <div className={`w-3 h-3 rounded-full border-2 border-[#051124] ${consecutiveGoals >= idx + 1 ? 'bg-blue-400' : 'bg-gray-400'}`}></div>
              <span className={`text-[10px] mt-1 font-bold ${consecutiveGoals >= idx + 1 ? 'text-white' : 'text-gray-500'}`}>x{mult}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 w-full max-w-lg relative mt-12 z-10 flex flex-col justify-end pb-32">
        
        {/* Goal Net */}
        <div className="absolute top-[10%] left-[5%] right-[5%] h-[50%] border-t-[6px] border-l-[6px] border-r-[6px] border-gray-300 rounded-t-sm shadow-[0_0_20px_rgba(255,255,255,0.2)]"></div>
        <div className="absolute top-[10%] left-[5%] right-[5%] h-[50%] opacity-40 bg-[url('https://www.transparenttextures.com/patterns/net.png')]"></div>

        {/* Current Multiplier Display */}
        {gameState !== 'idle' && (
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 text-white font-black text-4xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] italic">
            x{MULTIPLIERS[consecutiveGoals].toFixed(2)}
          </div>
        )}

        <style>
          {`
            @keyframes idleGoalkeeper {
              0%, 100% { transform: translateX(-50%) translateY(0); }
              50% { transform: translateX(-50%) translateY(-5px); }
            }
            .animate-idle {
              animation: idleGoalkeeper 2s ease-in-out infinite;
            }
          `}
        </style>

        {/* Goalkeeper */}
        <div className={`absolute top-[35%] w-32 h-32 transition-all duration-500 z-20 flex items-center justify-center drop-shadow-2xl
          ${goalkeeperPos === 'center' ? 'left-1/2 -translate-x-1/2 animate-idle' : ''}
          ${goalkeeperPos === 'left' ? 'left-[25%] -translate-x-1/2 rotate-[-60deg] translate-y-10' : ''}
          ${goalkeeperPos === 'right' ? 'left-[75%] -translate-x-1/2 rotate-[60deg] translate-y-10' : ''}
        `}>
          <div className="w-full h-full bg-[url('https://cdn-icons-png.flaticon.com/512/3229/3229410.png')] bg-contain bg-center bg-no-repeat opacity-90 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"></div>
        </div>

        {/* Ball */}
        <div className={`absolute w-14 h-14 bg-white rounded-full shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.5),0_10px_20px_rgba(0,0,0,0.5)] z-30 transition-all duration-500 ease-out
          ${ballPos === 'center' && gameState === 'idle' ? 'bottom-[10%] left-1/2 -translate-x-1/2 scale-100' : ''}
          ${ballPos === 'center' && gameState !== 'idle' ? 'bottom-[40%] left-1/2 -translate-x-1/2 scale-75' : ''}
          ${ballPos === 'left' ? 'bottom-[40%] left-[20%] -translate-x-1/2 scale-75' : ''}
          ${ballPos === 'right' ? 'bottom-[40%] left-[80%] -translate-x-1/2 scale-75' : ''}
        `}>
          <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/d/d3/Soccerball.svg')] bg-cover opacity-80 rounded-full"></div>
        </div>

        {/* Grass Texture */}
        <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[#0e3b1a] to-[#1c6e33] z-0" style={{ clipPath: 'polygon(0 30%, 100% 0, 100% 100%, 0% 100%)' }}>
          <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_20px,rgba(0,0,0,0.2)_20px,rgba(0,0,0,0.2)_40px)]"></div>
        </div>
      </div>

      {/* Bottom Controls Area */}
      <div className="w-full bg-[#030914] border-t border-white/10 z-20 pb-safe">
        <div className="max-w-md mx-auto p-4">
          
          {gameState === 'playing' ? (
            <div className="flex gap-4">
              <button onClick={() => handleKick('left')} className="flex-1 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                <ArrowLeft className="w-6 h-6 mx-auto text-gray-400" />
              </button>
              <button onClick={() => handleKick('center')} className="flex-1 py-4 bg-white/5 border border-white/10 rounded-xl font-black text-gray-400 hover:bg-white/10 transition-colors">
                MEIO
              </button>
              <button onClick={() => handleKick('right')} className="flex-1 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                <ArrowLeft className="w-6 h-6 mx-auto text-gray-400 rotate-180" />
              </button>
            </div>
          ) : gameState === 'result' ? (
            <div className="flex gap-4">
              {isGoal ? (
                <>
                  <button 
                    onClick={handleNextKick}
                    className="flex-1 bg-[#1a4a2e] hover:bg-[#23633e] border border-[#23633e] text-white py-4 rounded-xl font-bold transition-all flex flex-col items-center"
                  >
                    <span className="text-xs text-gray-300">Próximo Chute</span>
                    <span className="text-lg">x{MULTIPLIERS[consecutiveGoals + 1]}</span>
                  </button>
                  <button 
                    onClick={handleCashout}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-xl font-black uppercase transition-all flex flex-col items-center shadow-[0_0_15px_rgba(234,179,8,0.3)]"
                  >
                    <span className="text-xs font-bold opacity-80">Collect</span>
                    <span className="text-lg">R$ {(betAmount * MULTIPLIERS[consecutiveGoals]).toFixed(2)}</span>
                  </button>
                </>
              ) : (
                <button 
                  onClick={resetGame}
                  className="w-full bg-red-600 hover:bg-red-500 text-white py-4 rounded-xl font-black uppercase transition-all"
                >
                  TENTAR NOVAMENTE
                </button>
              )}
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-[10px] text-gray-500 font-bold uppercase">Betting</label>
                <div className="flex items-center justify-between bg-black/40 border border-white/10 rounded-xl p-2">
                  <button onClick={() => setBetAmount(Math.max(5, betAmount - 5))} className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-lg text-gray-400 hover:text-white">-</button>
                  <span className="font-bold">R$ {betAmount.toFixed(2)}</span>
                  <button onClick={() => setBetAmount(betAmount + 5)} className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-lg text-gray-400 hover:text-white">+</button>
                </div>
              </div>
              <button 
                onClick={handleStartGame}
                className="flex-1 h-14 mt-4 bg-white text-black hover:bg-gray-200 rounded-xl font-black uppercase transition-all flex flex-col items-center justify-center"
              >
                <span className="text-sm">JOGAR</span>
              </button>
            </div>
          )}

          {/* Footer Balance */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5 text-gray-500 text-xs font-bold">
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4" />
              R$ {balance.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
