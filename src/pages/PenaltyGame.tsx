import React, { useState, useEffect } from 'react';
import { ArrowLeft, Coins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Scene3D } from '../components/Penalty3D/Scene3D';

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

  const handleKick = (direction: 'left' | 'right') => {
    if (gameState !== 'playing') return;

    const nextMultiplier = MULTIPLIERS[consecutiveGoals + 1] || MULTIPLIERS[MULTIPLIERS.length - 1];
    const potentialWin = betAmount * nextMultiplier;
    const projectedBalance = balance + potentialWin;

    let willScore = false; // SEMPRE PERDER (CASA GANHA) PARA TESTAR ANIMAÇÕES DE DEFESA

    const options = ['left', 'right'].filter(d => d !== direction);
    
    let goalkeeperDir: 'center' | 'left' | 'right';
    if (willScore) {
      // Pula para o lado errado
      goalkeeperDir = options[Math.floor(Math.random() * options.length)] as any;
      setIsGoal(true);
      setConsecutiveGoals(prev => prev + 1);
      setGameState('result');
    } else {
      // Pula para o lado certo
      goalkeeperDir = direction;
      setIsGoal(false);
      setGameState('result');
    }

    setBallPos(direction);
    setGoalkeeperPos(goalkeeperDir);
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
    <div className="min-h-screen bg-[#0a101f] text-white flex flex-col font-sans relative overflow-hidden">
      
      {/* 3D Canvas - Full Screen Background */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows camera={{ position: [0, 2.5, 8], fov: 60 }}>
          <Scene3D 
            gameState={gameState} 
            goalkeeperPos={goalkeeperPos} 
            ballPos={ballPos}
            isGoal={isGoal}
          />
        </Canvas>
      </div>

      {/* Header - Overlaid */}
      <div className="relative z-10 bg-gradient-to-b from-black/80 to-transparent p-4 flex items-center gap-4">
        <button onClick={() => navigate('/')} className="p-2 bg-black/40 backdrop-blur-sm rounded-full hover:bg-white/20 transition">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <span className="font-bold text-sm tracking-widest uppercase">Penalty Shoot-Out</span>
      </div>

      {/* Multiplier Display - Moved to TOP sky area */}
      <div className="absolute top-[15%] w-full flex justify-center pointer-events-none z-10">
        <div className="text-6xl font-black text-white drop-shadow-[0_5px_15px_rgba(0,0,0,1)] tracking-tighter">
          x{gameState === 'playing' ? MULTIPLIERS[consecutiveGoals].toFixed(2) : (consecutiveGoals > 0 ? MULTIPLIERS[consecutiveGoals - 1].toFixed(2) : '1.00')}
        </div>
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-10 flex-1 flex flex-col justify-end pb-8">
        
        {/* Bottom UI */}
        <div className="px-4">
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 border border-white/10 shadow-lg">
            
            {gameState === 'playing' ? (
              <div className="flex justify-center gap-6 z-20">
                <button 
                  onClick={() => handleKick('left')}
                  disabled={gameState !== 'playing' || balance < betAmount}
                  className="w-16 h-16 rounded-full bg-red-600 border-b-4 border-red-800 shadow-[0_5px_15px_rgba(220,38,38,0.5)] flex items-center justify-center hover:bg-red-500 active:translate-y-1 active:border-b-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="w-8 h-8 rounded-full border-4 border-white opacity-80 pointer-events-none"></div>
                </button>
                <button 
                  onClick={() => handleKick('right')}
                  disabled={gameState !== 'playing' || balance < betAmount}
                  className="w-16 h-16 rounded-full bg-blue-600 border-b-4 border-blue-800 shadow-[0_5px_15px_rgba(37,99,235,0.5)] flex items-center justify-center hover:bg-blue-500 active:translate-y-1 active:border-b-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="w-8 h-8 rounded-full border-4 border-white opacity-80 pointer-events-none"></div>
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
              <div 
                className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full border border-white/5 cursor-pointer hover:bg-white/10 transition"
                onClick={() => setBalance(prev => prev + 1000)}
                title="Adicionar saldo falso de teste"
              >
                <Coins className="w-3.5 h-3.5 text-yellow-500" />
                Saldo: <span className="text-white">R$ {balance.toFixed(2)}</span>
                <span className="text-green-400 ml-2 border border-green-500/30 px-2 py-0.5 rounded-full text-[9px]">+ R$1000</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
