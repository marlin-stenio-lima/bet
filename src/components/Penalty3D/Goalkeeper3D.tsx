import React, { useEffect, useRef } from 'react';
import { useFBX, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

interface Goalkeeper3DProps {
  action: 'idle' | 'diveLeft' | 'diveRight' | 'catchCenter';
}

export function Goalkeeper3D({ action }: Goalkeeper3DProps) {
  const group = useRef<THREE.Group>(null);

  const idleFile = useFBX('/models/idle.fbx');
  const diveLeftFile = useFBX('/models/diveLeft.fbx');
  const diveRightFile = useFBX('/models/diveRight.fbx');
  
  const idleAnim = idleFile.animations[0];
  const diveLeftAnim = diveLeftFile.animations[0];
  const diveRightAnim = diveRightFile.animations[0];

  if (idleAnim) idleAnim.name = 'idle';
  if (diveLeftAnim) diveLeftAnim.name = 'diveLeft';
  if (diveRightAnim) diveRightAnim.name = 'diveRight';

  const animations = [idleAnim, diveLeftAnim, diveRightAnim].filter(Boolean);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    Object.values(actions).forEach(a => a?.stop());
    
    const animToPlay = action === 'catchCenter' ? 'idle' : action;
    const currentAction = actions[animToPlay];
    
    let timeout: NodeJS.Timeout;

    if (currentAction) {
      currentAction.reset();
      currentAction.paused = false;
      currentAction.play();
      if (animToPlay === 'idle') {
        currentAction.setLoop(THREE.LoopRepeat, Infinity);
        currentAction.timeScale = 1; 
      } else {
        currentAction.setLoop(THREE.LoopOnce, 1);
        currentAction.clampWhenFinished = true;
        currentAction.timeScale = 0.8; // Deixar o salto um pouquinho mais dramático e lento
        // Pausar a animação exatamente quando ele atinge o chão
        timeout = setTimeout(() => {
          if (currentAction) {
            currentAction.paused = true;
          }
        }, 1400); // 1.4 segundos é o tempo ideal para o momento que ele cai
      }
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [action, actions]);

  return (
    <group ref={group} dispose={null}>
      <primitive object={idleFile} scale={0.018} position={[0, 0, -5]} rotation={[0, 0, 0]} />
    </group>
  );
}

useFBX.preload('/models/idle.fbx');
useFBX.preload('/models/diveLeft.fbx');
useFBX.preload('/models/diveRight.fbx');
