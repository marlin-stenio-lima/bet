import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import { Goalkeeper3D } from './Goalkeeper3D';
import * as THREE from 'three';

interface Scene3DProps {
  gameState: 'idle' | 'playing' | 'result';
  goalkeeperPos: 'center' | 'left' | 'right';
  ballPos: 'center' | 'left' | 'right';
  isGoal: boolean;
}

function StadiumBackground() {
  const texture = useLoader(THREE.TextureLoader, '/textures/stadium.png');
  return (
    <mesh>
      <sphereGeometry args={[60, 32, 32]} />
      <meshBasicMaterial map={texture} depthWrite={false} toneMapped={false} side={THREE.BackSide} />
    </mesh>
  );
}

export function Scene3D({ gameState, goalkeeperPos, ballPos, isGoal }: Scene3DProps) {
  const ballRef = useRef<THREE.Mesh>(null);
  
  // Mapear posição do goleiro para a ação
  let action: 'idle' | 'diveLeft' | 'diveRight' | 'catchCenter' = 'idle';
  if (gameState === 'result') {
     if (goalkeeperPos === 'left') action = 'diveLeft';
     if (goalkeeperPos === 'right') action = 'diveRight';
     if (goalkeeperPos === 'center') action = 'catchCenter';
  }

  useFrame((state, delta) => {
    if (ballRef.current) {
      if (gameState === 'idle' || gameState === 'playing') {
        ballRef.current.position.lerp(new THREE.Vector3(0, 0.25, 4), 0.2); // Posição do pênalti
        ballRef.current.rotation.x += 0.01; // Bola rolando de leve
      } else if (gameState === 'result') {
        // Chute indo para a direção (mais para os cantos por causa da trave maior)
        const destX = ballPos === 'left' ? -3.5 : ballPos === 'right' ? 3.5 : 0;
        const destY = ballPos === 'center' ? 1.8 : 1.5; 
        const destZ = -5; // Linha do gol
        
        const target = new THREE.Vector3(destX, destY, destZ);
        
        // Se o goleiro pegar, a bola para na mão dele (um pouco mais para frente e no centro)
        if (!isGoal) {
            target.z = -3.8; 
            if (ballPos === 'center') {
              target.y = 1.8; // Altura da barriga/peito do goleiro
              target.x = 0;
            } else if (ballPos === 'left') {
              target.y = 0.5; // Altura no chão
              target.x = -2.5; // Posição do corpo pulando
            } else if (ballPos === 'right') {
              target.y = 0.5; // Altura no chão
              target.x = 2.5; // Posição do corpo pulando
            }
        }
        
        ballRef.current.position.lerp(target, 0.1);
        ballRef.current.rotation.x -= 0.5; // Bola rodando rápido no ar
      }
    }
  });

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />

      <React.Suspense fallback={null}>
        <StadiumBackground />
      </React.Suspense>

      {/* Gramado */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#115e29" roughness={0.9} />
      </mesh>

      {/* Trave (Aumentada para caber o goleiro) */}
      <mesh position={[-4.5, 2, -5]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 4]} />
        <meshStandardMaterial color="#cbd5e1" />
      </mesh>
      <mesh position={[4.5, 2, -5]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 4]} />
        <meshStandardMaterial color="#cbd5e1" />
      </mesh>
      <mesh position={[0, 4, -5]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 9.16]} />
        <meshStandardMaterial color="#cbd5e1" />
      </mesh>

      {/* Redes da Trave (Wireframe detalhado para efeito de rede real) */}
      <mesh position={[0, 2, -6.5]}>
        <planeGeometry args={[9, 4, 45, 20]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.3} wireframe />
      </mesh>
      <mesh position={[-4.5, 2, -5.75]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[1.5, 4, 8, 20]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.3} wireframe />
      </mesh>
      <mesh position={[4.5, 2, -5.75]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[1.5, 4, 8, 20]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.3} wireframe />
      </mesh>

      {/* Goleiro */}
      <Goalkeeper3D action={action} />

      {/* Bola */}
      <mesh ref={ballRef} position={[0, 0.25, 4]} castShadow>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
    </>
  );
}
