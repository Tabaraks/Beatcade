import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSnapshot } from "valtio";
import { useFrame, useThree } from "@react-three/fiber";
import { Decal, useGLTF, useTexture, Merged } from "@react-three/drei";
import * as THREE from "three";

import state from "../../store";

const Packs = () => {
  const snap = useSnapshot(state);
  const stateString = JSON.stringify(snap);

  const { scene, nodes, materials } = useGLTF("/models/packs/pack.gltf");
  console.log(scene);
  scene.children[0].position.x = -2;
  return (
    <group
      key={stateString}
      scale={[0.4, 0.4, 0.4]}
      position={[0, 0, 0]}
      rotation={[(Math.PI * 8) / 180, (-Math.PI * 50) / 180, 0]}
    >
      <primitive object={scene} />
    </group>
  );
};

export default Packs;
