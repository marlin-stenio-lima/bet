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

      {/* Multiplier Display - Glassmorphism Pill at TOP */}
      <div className="absolute top-24 w-full flex justify-center pointer-events-none z-10">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 px-8 py-2 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.05)]">
          <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)] tracking-tighter">
            x{gameState === 'playing' ? MULTIPLIERS[consecutiveGoals].toFixed(2) : (consecutiveGoals > 0 ? MULTIPLIERS[consecutiveGoals - 1].toFixed(2) : '1.00')}
          </div>
        </div>
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-10 flex-1 flex flex-col justify-end pb-8">
        
        {/* Bottom UI */}
        <div className="px-4">
          <div className="bg-[#050b14]/80 backdrop-blur-xl rounded-3xl p-5 border border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
            
            {gameState === 'playing' ? (
              <div className="flex justify-center gap-8 z-20">
                <button 
                  onClick={() => handleKick('left')}
                  disabled={gameState !== 'playing' || balance < betAmount}
                  className="group relative w-20 h-20 rounded-full bg-gradient-to-b from-red-500 to-red-700 shadow-[0_0_20px_rgba(220,38,38,0.3),inset_0_2px_0_rgba(255,255,255,0.2)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="w-10 h-10 rounded-full border-[5px] border-white/80 group-hover:border-white transition-all shadow-inner"></div>
                </button>
                <button 
                  onClick={() => handleKick('right')}
                  disabled={gameState !== 'playing' || balance < betAmount}
                  className="group relative w-20 h-20 rounded-full bg-gradient-to-b from-blue-500 to-blue-700 shadow-[0_0_20px_rgba(37,99,235,0.3),inset_0_2px_0_rgba(255,255,255,0.2)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="w-10 h-10 rounded-full border-[5px] border-white/80 group-hover:border-white transition-all shadow-inner"></div>
                </button>
              </div>
            ) : gameState === 'result' ? (
              <div className="flex gap-4">
                {isGoal ? (
                  <>
                    <button 
                      onClick={handleNextKick}
                      className="flex-1 bg-gradient-to-b from-[#16a34a] to-[#14532d] border border-[#22c55e]/30 text-white py-4 rounded-2xl font-bold hover:brightness-110 active:scale-95 transition-all flex flex-col items-center shadow-[0_0_20px_rgba(34,197,94,0.2),inset_0_2px_0_rgba(255,255,255,0.1)]"
                    >
                      <span className="text-[11px] text-[#86efac] uppercase tracking-widest font-black mb-0.5">Próximo Chute</span>
                      <span className="text-2xl drop-shadow-md">x{MULTIPLIERS[consecutiveGoals + 1]}</span>
                    </button>
                    <button 
                      onClick={handleCashout}
                      className="flex-1 bg-gradient-to-b from-[#eab308] to-[#854d0e] border border-[#fef08a]/30 text-white py-4 rounded-2xl hover:brightness-110 active:scale-95 transition-all flex flex-col items-center shadow-[0_0_20px_rgba(234,179,8,0.2),inset_0_2px_0_rgba(255,255,255,0.2)]"
                    >
                      <span className="text-[11px] font-black uppercase text-[#fef08a] tracking-widest mb-0.5">Pegar Lucro</span>
                      <span className="text-2xl font-black drop-shadow-md">R$ {(betAmount * MULTIPLIERS[consecutiveGoals]).toFixed(2)}</span>
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={resetGame}
                    className="w-full bg-gradient-to-b from-[#ef4444] to-[#7f1d1d] border border-[#fca5a5]/20 text-white py-5 rounded-2xl font-black text-lg tracking-wider uppercase hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(239,68,68,0.3),inset_0_2px_0_rgba(255,255,255,0.1)]"
                  >
                    TENTAR NOVAMENTE
                  </button>
                )}
              </div>
            ) : (
              <div className="flex gap-4 items-stretch">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[11px] text-blue-200/50 font-black uppercase tracking-widest pl-1">Aposta</label>
                  <div className="flex items-center justify-between bg-black/40 border border-white/5 rounded-2xl p-2 shadow-inner">
                    <button onClick={() => setBetAmount(Math.max(5, betAmount - 5))} className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors text-2xl font-light">-</button>
                    <span className="font-black text-xl text-white">R$ {betAmount.toFixed(2)}</span>
                    <button onClick={() => setBetAmount(betAmount + 5)} className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors text-2xl font-light">+</button>
                  </div>
                </div>
                <button 
                  onClick={handleStartGame}
                  className="flex-1 mt-[26px] bg-gradient-to-b from-blue-500 to-blue-700 border border-blue-400/30 text-white hover:brightness-110 active:scale-95 rounded-2xl font-black uppercase transition-all flex flex-col items-center justify-center shadow-[0_0_25px_rgba(59,130,246,0.3),inset_0_2px_0_rgba(255,255,255,0.2)]"
                >
                  <span className="text-xl tracking-widest drop-shadow-md">JOGAR</span>
                </button>
              </div>
            )}

            {/* Footer Balance */}
            <div className="flex justify-center items-center mt-5 pt-4 border-t border-white/5 text-gray-400 text-[11px] font-bold tracking-wider">
              <div 
                className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full border border-white/5 cursor-pointer hover:bg-white/10 transition"
                onClick={() => setBalance(prev => prev + 1000)}
                title="Adicionar saldo"
              >
                <Coins className="w-4 h-4 text-yellow-500 drop-shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
                Saldo: <span className="text-white font-black text-sm">R$ {balance.toFixed(2)}</span>
                <span className="text-green-400 ml-2 bg-green-500/20 border border-green-500/30 px-2 py-0.5 rounded-full text-[9px] font-black">+ R$1000</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
