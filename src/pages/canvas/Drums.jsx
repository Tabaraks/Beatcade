import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSnapshot } from 'valtio';
import { useFrame, useThree } from '@react-three/fiber';
import { Decal, useGLTF, useTexture, Merged } from '@react-three/drei';
import * as THREE from 'three'

import state from '../../store';

const Drums = () => {

  const snap = useSnapshot(state);
  const stateString = JSON.stringify(snap);

  // const { scene, nodes, materials } = useGLTF('/models/drums/Modern Black.glb');
  const { scene, nodes, materials } = useGLTF('/models/drums/MPC_V1.glb');
  return (
    <group key={stateString} scale={[1, 1, 1]} position={[0, 0, 0]}
      rotation={[0, - Math.PI  / 2, 0]}
    >
      <primitive object={scene} />
    </group >
  )
}

export default Drums