import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
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
            target.z = -4.0; 
            if (ballPos === 'center') {
              target.y = 1.3; 
              target.x = 0;
            } else if (ballPos === 'left') {
              target.y = 1.0; 
              target.x = -3.5; 
            } else if (ballPos === 'right') {
              target.y = 1.0; 
              target.x = 3.5; 
            }
        }
        
        ballRef.current.position.lerp(target, 0.035);
        ballRef.current.rotation.x -= 0.2; // Bola rodando um pouco mais devagar no ar
      }
    }
  });

  return (
    <>
      <color attach="background" args={['#030712']} />
      <fog attach="fog" args={['#030712', 10, 45]} />
      <Environment preset="night" />
      <ambientLight intensity={0.3} />
      
      {/* Refletores do Estádio */}
      <spotLight position={[10, 20, 10]} angle={0.4} penumbra={1} intensity={6} castShadow shadow-mapSize={[1024, 1024]} color="#e0f2fe" />
      <spotLight position={[-10, 20, 10]} angle={0.4} penumbra={1} intensity={6} castShadow shadow-mapSize={[1024, 1024]} color="#bae6fd" />

      <React.Suspense fallback={null}>
        <StadiumBackground />
      </React.Suspense>

      {/* Gramado Base Premium */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#052e10" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Faixas do Gramado Realistas */}
      {[...Array(40)].map((_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -40 + i * 3]} receiveShadow>
          <planeGeometry args={[100, 1.5]} />
          <meshStandardMaterial color="#04210a" roughness={0.6} metalness={0.1} transparent opacity={0.7} />
        </mesh>
      ))}

      {/* Trave e Redes */}
      <mesh position={[-4.5, 2, -5]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 4]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[4.5, 2, -5]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 4]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[0, 4, -5]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 9.16]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.8} />
      </mesh>

      <mesh position={[0, 2, -6.5]}>
        <planeGeometry args={[9, 4, 45, 20]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.15} wireframe />
      </mesh>
      <mesh position={[-4.5, 2, -5.75]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[1.5, 4, 8, 20]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.15} wireframe />
      </mesh>
      <mesh position={[4.5, 2, -5.75]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[1.5, 4, 8, 20]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.15} wireframe />
      </mesh>

      {/* Goleiro */}
      <Goalkeeper3D action={action} />

      {/* Bola */}
      <mesh ref={ballRef} position={[0, 0.25, 4]} castShadow>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} emissive="#111111" />
      </mesh>

      {/* Pós-processamento HDR/Bloom */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.9} intensity={1.5} />
        <Vignette eskil={false} offset={0.1} darkness={0.7} />
      </EffectComposer>
    </>
  );
}
