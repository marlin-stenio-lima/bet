import React, { useEffect, useRef } from 'react';
import { useFBX, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

interface Goalkeeper3DProps {
  action: 'idle' | 'diveLeft' | 'diveRight' | 'catchCenter';
}

export function Goalkeeper3D({ action }: Goalkeeper3DProps) {
  const group = useRef<THREE.Group>(null);

  // Load the main model with skin
  const mainModel = useFBX('/models/Goalkeeper Body Block.fbx');
  
  // Load animations from other files
  const diveRightFile = useFBX('/models/Goalkeeper Body Block (1).fbx');
  const catchCenterFile = useFBX('/models/Goalkeeper Catch.fbx');
  const diveLeftFile = useFBX('/models/Goalkeeper Catch (1).fbx');
  
  // Extract animations
  const idleAnim = mainModel.animations[0];
  const diveRightAnim = diveRightFile.animations[0];
  const catchCenterAnim = catchCenterFile.animations[0];
  const diveLeftAnim = diveLeftFile.animations[0];

  // Rename animations for easy reference
  if (idleAnim) idleAnim.name = 'idle';
  if (diveRightAnim) diveRightAnim.name = 'diveRight';
  if (catchCenterAnim) catchCenterAnim.name = 'catchCenter';
  if (diveLeftAnim) diveLeftAnim.name = 'diveLeft';

  const animations = [idleAnim, diveRightAnim, catchCenterAnim, diveLeftAnim].filter(Boolean);

  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Stop all current animations
    Object.values(actions).forEach(a => a?.stop());
    
    // Play the requested animation
    const currentAction = actions[action];
    if (currentAction) {
      currentAction.reset().play();
      
      if (action === 'idle') {
        currentAction.setLoop(THREE.LoopRepeat, Infinity);
        currentAction.timeScale = 0.1; // Slow down the idle animation if it's a dive
      } else {
        currentAction.setLoop(THREE.LoopOnce, 1);
        currentAction.clampWhenFinished = true;
      }
    }
  }, [action, actions]);

  return (
    <group ref={group} dispose={null}>
      <primitive object={mainModel} scale={0.025} position={[0, 0, -5]} rotation={[0, 0, 0]} />
    </group>
  );
}

// Pre-load the models
useFBX.preload('/models/Goalkeeper Body Block.fbx');
useFBX.preload('/models/Goalkeeper Body Block (1).fbx');
useFBX.preload('/models/Goalkeeper Catch.fbx');
useFBX.preload('/models/Goalkeeper Catch (1).fbx');
