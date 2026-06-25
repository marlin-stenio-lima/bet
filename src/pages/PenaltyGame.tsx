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
    <div className="min-h-screen bg-[#051124] text-white font-sans flex flex-col items-center justify-center relative overflow-hidden w-full">
      
      <div className="w-full max-w-md h-[100dvh] max-h-[900px] bg-[#0c1f3a] relative shadow-2xl overflow-hidden flex flex-col">
        
        {/* Sky Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#010812] to-[#0a1f33] z-0"></div>

        {/* Spotlights */}
        <div className="absolute top-[-10%] left-1/4 w-32 h-[600px] bg-cyan-400/5 blur-3xl rotate-[25deg] z-0"></div>
        <div className="absolute top-[-10%] right-1/4 w-32 h-[600px] bg-cyan-400/5 blur-3xl rotate-[-25deg] z-0"></div>

        {/* Header */}
        <div className="w-full flex justify-between items-center p-4 z-10">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/')} className="p-2 bg-black/40 backdrop-blur-sm rounded-full hover:bg-white/20 transition">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <span className="text-gray-300 font-bold text-xs tracking-widest uppercase">Penalty Shoot-Out</span>
          </div>
        </div>

        {/* Progress Bar (Multipliers) */}
        <div className="w-full px-6 mt-2 z-10">
          <div className="flex justify-between items-end mb-2 px-1">
            <div className="flex gap-1.5">
              <div className="w-6 h-3 bg-green-600 rounded-sm"></div>
              <div className="w-6 h-3 bg-red-600 rounded-sm"></div>
            </div>
            <div className="flex gap-1.5">
              <div className="w-6 h-3 bg-yellow-400 rounded-sm"></div>
              <div className="w-6 h-3 bg-blue-600 rounded-sm"></div>
            </div>
          </div>
          <div className="w-full h-1.5 bg-white/20 rounded-full relative">
            <div 
              className="absolute top-0 left-0 h-full bg-[#3b82f6] rounded-full transition-all duration-500"
              style={{ width: `${(consecutiveGoals / 5) * 100}%` }}
            ></div>
            {MULTIPLIERS.slice(1).map((mult, idx) => (
              <div key={idx} className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center" style={{ left: `${((idx + 1) / 5) * 100}%` }}>
                <div className={`w-3.5 h-3.5 rounded-full border-2 border-[#0c1f3a] ${consecutiveGoals >= idx + 1 ? 'bg-blue-400 shadow-[0_0_8px_#60a5fa]' : 'bg-gray-500'}`}></div>
                <span className={`text-[9px] mt-1 font-black ${consecutiveGoals >= idx + 1 ? 'text-white' : 'text-gray-500'}`}>x{mult}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Game Area */}
        <div className="flex-1 w-full relative z-10 flex flex-col justify-end">
          
          {/* Grass Area - exactly 40% of the game area height */}
          <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-[#0e421c] to-[#1a612b] z-0 shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
             {/* Penalty Box Line */}
            <div className="absolute top-0 left-[10%] right-[10%] h-full border-t-[3px] border-l-[3px] border-r-[3px] border-white/30"></div>
            {/* Penalty Spot */}
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-5 h-5 bg-white/60 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.5)]"></div>
          </div>

          {/* Goal Net - Sitting right on the grass line */}
          <div className="absolute bottom-[40%] left-[5%] right-[5%] h-[35%] border-t-[8px] border-l-[8px] border-r-[8px] border-[#cbd5e1] shadow-2xl z-0"></div>
          <div className="absolute bottom-[40%] left-[5%] right-[5%] h-[35%] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 z-0 border-t-8 border-transparent"></div>

          {/* Current Multiplier Banner */}
          {gameState !== 'idle' && (
            <div className="absolute top-[10%] left-1/2 -translate-x-1/2 text-white font-black text-3xl drop-shadow-md z-30">
              x{MULTIPLIERS[consecutiveGoals].toFixed(2)}
            </div>
          )}

          {/* Goalkeeper Placeholder (Fixed base sitting on the grass line) */}
          <div className={`absolute bottom-[40%] w-24 h-28 transition-all duration-500 z-20 flex flex-col items-center justify-end
            ${goalkeeperPos === 'center' ? 'left-1/2 -translate-x-1/2' : ''}
            ${goalkeeperPos === 'left' ? 'left-[25%] -translate-x-1/2 translate-y-4 -rotate-12' : ''}
            ${goalkeeperPos === 'right' ? 'left-[75%] -translate-x-1/2 translate-y-4 rotate-12' : ''}
          `}>
            <div className="w-14 h-20 bg-blue-600 rounded-t-3xl rounded-b-md shadow-[0_10px_20px_rgba(0,0,0,0.5)] border-2 border-blue-800 flex flex-col items-center pt-2">
              <div className="w-7 h-7 bg-[#fcd34d] rounded-full mb-1 border-2 border-yellow-600"></div>
              <div className="w-full h-2 bg-blue-800 mt-auto"></div>
            </div>
          </div>

          {/* Ball */}
          <div className={`absolute w-12 h-12 bg-white rounded-full shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.4),0_15px_15px_rgba(0,0,0,0.6)] z-30 transition-all duration-500 ease-out
            ${ballPos === 'center' && gameState === 'idle' ? 'bottom-[12%] left-1/2 -translate-x-1/2 scale-100' : ''}
            ${ballPos === 'center' && gameState !== 'idle' ? 'bottom-[42%] left-1/2 -translate-x-1/2 scale-75' : ''}
            ${ballPos === 'left' ? 'bottom-[42%] left-[20%] -translate-x-1/2 scale-75' : ''}
            ${ballPos === 'right' ? 'bottom-[42%] left-[80%] -translate-x-1/2 scale-75' : ''}
          `}>
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/d/d3/Soccerball.svg')] bg-cover opacity-95 rounded-full"></div>
          </div>
        </div>

        {/* Bottom Controls Area */}
        <div className="w-full bg-[#071221] border-t border-white/5 z-40 pb-safe shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
          <div className="p-4">
            
            {gameState === 'playing' ? (
              <div className="flex gap-3">
                <button onClick={() => handleKick('left')} className="flex-1 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                  <ArrowLeft className="w-7 h-7 mx-auto text-gray-300" />
                </button>
                <button onClick={() => handleKick('center')} className="flex-1 py-4 bg-white/5 border border-white/10 rounded-xl font-black text-gray-300 hover:bg-white/10 transition-colors text-sm">
                  MEIO
                </button>
                <button onClick={() => handleKick('right')} className="flex-1 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                  <ArrowLeft className="w-7 h-7 mx-auto text-gray-300 rotate-180" />
                </button>
              </div>
            ) : gameState === 'result' ? (
              <div className="flex gap-3">
                {isGoal ? (
                  <>
                    <button 
                      onClick={handleNextKick}
                      className="flex-1 bg-gradient-to-b from-[#1a4a2e] to-[#0d2718] border border-[#23633e] text-white py-3 rounded-xl font-bold hover:brightness-110 transition-all flex flex-col items-center"
                    >
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest">Próximo Chute</span>
                      <span className="text-xl">x{MULTIPLIERS[consecutiveGoals + 1]}</span>
                    </button>
                    <button 
                      onClick={handleCashout}
                      className="flex-1 bg-gradient-to-b from-[#fcd34d] to-[#d97706] text-black py-3 rounded-xl hover:brightness-110 transition-all flex flex-col items-center shadow-[0_0_15px_rgba(234,179,8,0.2)]"
                    >
                      <span className="text-[10px] font-black uppercase opacity-70">Collect</span>
                      <span className="text-xl font-black">R$ {(betAmount * MULTIPLIERS[consecutiveGoals]).toFixed(2)}</span>
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={resetGame}
                    className="w-full bg-gradient-to-b from-[#ef4444] to-[#991b1b] text-white py-4 rounded-xl font-black uppercase hover:brightness-110 transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                  >
                    TENTAR NOVAMENTE
                  </button>
                )}
              </div>
            ) : (
              <div className="flex gap-3 items-center">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest pl-1">Aposta</label>
                  <div className="flex items-center justify-between bg-black/50 border border-white/10 rounded-xl p-1.5">
                    <button onClick={() => setBetAmount(Math.max(5, betAmount - 5))} className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors text-lg font-bold">-</button>
                    <span className="font-bold text-lg text-white">R$ {betAmount.toFixed(2)}</span>
                    <button onClick={() => setBetAmount(betAmount + 5)} className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors text-lg font-bold">+</button>
                  </div>
                </div>
                <button 
                  onClick={handleStartGame}
                  className="flex-1 h-14 mt-[22px] bg-gradient-to-b from-[#ffffff] to-[#cccccc] text-black hover:brightness-110 rounded-xl font-black uppercase transition-all flex flex-col items-center justify-center shadow-lg"
                >
                  <span className="text-base tracking-widest">JOGAR</span>
                </button>
              </div>
            )}

            {/* Footer Balance */}
            <div className="flex justify-center items-center mt-4 pt-3 border-t border-white/5 text-gray-400 text-[11px] font-bold tracking-wider">
              <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
                <Coins className="w-3.5 h-3.5 text-yellow-500" />
                Saldo: <span className="text-white">R$ {balance.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
