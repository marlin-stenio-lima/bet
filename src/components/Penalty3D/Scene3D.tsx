import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import { Goalkeeper3D } from './Goalkeeper3D';
import * as THREE from 'three';

interface Scene3DProps {
  gameState: 'idle' | 'playing' | 'result';
  goalkeeperPos: 'center' | 'left' | 'right';
  ballPos: 'center' | 'left' | 'right';
  isGoal: boolean;
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
        ballRef.current.position.lerp(new THREE.Vector3(0, 0.2, 5), 0.2); // Posição do pênalti
        ballRef.current.rotation.x += 0.01; // Bola rolando de leve
      } else if (gameState === 'result') {
        // Chute indo para a direção
        const destX = ballPos === 'left' ? -2.5 : ballPos === 'right' ? 2.5 : 0;
        const destY = 1.2;
        const destZ = -5; // Linha do gol
        
        const target = new THREE.Vector3(destX, destY, destZ);
        
        // Se o goleiro pegar, a bola para na mão dele (um pouco mais para frente e no centro)
        if (!isGoal) {
            target.z = -3.5; 
            target.y = 1.0;
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

      {/* Gramado */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#115e29" roughness={0.9} />
      </mesh>

      {/* Trave */}
      <mesh position={[-3.5, 1.5, -5]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 3]} />
        <meshStandardMaterial color="#cbd5e1" />
      </mesh>
      <mesh position={[3.5, 1.5, -5]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 3]} />
        <meshStandardMaterial color="#cbd5e1" />
      </mesh>
      <mesh position={[0, 3, -5]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 7.16]} />
        <meshStandardMaterial color="#cbd5e1" />
      </mesh>

      {/* Goleiro */}
      <Goalkeeper3D action={action} />

      {/* Bola */}
      <mesh ref={ballRef} position={[0, 0.2, 5]} castShadow>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
    </>
  );
}
