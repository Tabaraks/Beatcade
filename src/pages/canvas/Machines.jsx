import React, { useCallback, useEffect, useMemo, useState } from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame, useThree } from "@react-three/fiber";
import { Decal, useGLTF, useTexture, Merged } from "@react-three/drei";
import * as THREE from "three";

import state from "../../store";
import { KeyManager } from "./KeyManager";

const Machines = () => {
  const snap = useSnapshot(state);
  const stateString = JSON.stringify(snap);
  const { camera } = useThree();

  const { scene, nodes, materials } = useGLTF("/models/machines/piano.glb");

  useEffect(() => {
    const keyManager = new KeyManager(scene, materials, camera, snap.btnColor);
  }, [snap.btnColor]);

  return (
    <group
      key={stateString}
      scale={[1.5, 1.5, 1.5]}
      position={[0, 0, 0]}
      rotation={[(Math.PI * 30) / 180, 0, 0]}
    >
      <primitive object={scene} />
    </group>
  );
};

export default Machines;
