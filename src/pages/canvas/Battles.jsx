import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSnapshot } from "valtio";
import { useFrame, useThree } from "@react-three/fiber";
import { Decal, useGLTF, useTexture, Merged } from "@react-three/drei";
import * as THREE from "three";

import state from "../../store";

const Battles = () => {
  const snap = useSnapshot(state);
  const stateString = JSON.stringify(snap);

  const { scene, nodes, materials } = useGLTF("/models/Card_A.glb");

  return (
    <group
      key={stateString}
      scale={[0.6, 0.6, 0.6]}
      position={[0.3, 0, 0]}
      rotation={[0, 0, 0]}
    >
      <primitive object={scene} />
    </group>
  );
};

export default Battles;
