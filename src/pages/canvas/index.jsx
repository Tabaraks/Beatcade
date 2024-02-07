import { Canvas, useThree } from "@react-three/fiber";
import {
  MeshReflectorMaterial,
  Center,
  OrbitControls,
  BakeShadows,
  Environment,
  CameraControls,
} from "@react-three/drei";
import { useSnapshot } from "valtio";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
} from "@react-three/postprocessing";
import { useEffect, useRef, useState } from "react";

import CameraRig from "./CameraRig";
import Machines from "./Machines";
import state, { PAGES } from "../../store";
import Packs from "./Packs";
import { addStars } from "./starEffect";
import Drums from "./Drums";
import Battles from "./Battles";

const CanvasModel = ({ assets }) => {
  // const { audio } = assets;
  // const playSound = () => {
  //   audio.start();
  // }

  const snap = useSnapshot(state);
  return (
    <div
      className={"absolute w-full h-full flex flex-row z-0"}
      // style={
      //   snap.model === "Packs"
      //     ? { transform: "translateX(-15%)" }
      //     : { transform: "translateX(0)" }
      // }
    >
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 25 }}
        className="relative max-w-full h-full transition-all ease-in"
      >
        <Scene />
      </Canvas>
    </div>
  );
};

const Scene = () => {
  const { scene } = useThree();
  const groupRef = useRef(null);
  const cameraControlsRef = useRef(null);
  const snap = useSnapshot(state);

  useEffect(() => {
    cameraControlsRef.current?.reset(true);
  }, [snap.model, snap.modelId]);

  useEffect(() => {
    if (groupRef.current) {
      addStars(groupRef.current);
    }
  }, []);

  return (
    <>
      {/* <color attach="background" args={["black"]} />  //  #7c4823 */}
      <pointLight
        castShadow
        color="#224455"
        position={[1, 1, -1]}
        intensity={5}
      />
      <pointLight
        castShadow
        color="#224455"
        position={[-1, 1, -1]}
        intensity={5}
      />
      <pointLight
        castShadow
        color="#224455"
        position={[-2, 0, 0]}
        intensity={5}
      />
      <pointLight
        castShadow
        color="#224455"
        position={[2, 0, 0]}
        intensity={5}
      />
      <pointLight
        castShadow
        color="#224455"
        position={[0, 0, -2]}
        intensity={5}
      />
      <pointLight
        castShadow
        color="#224455"
        position={[0, 0, 2]}
        intensity={5}
      />
      <pointLight
        castShadow
        color="#224455"
        position={[0, 1, 0]}
        intensity={5}
      />
      <hemisphereLight intensity={1} groundColor="#111122" />

      {/* <Environment
        background near={1} far={1000} resolution={256}
        files={'/SpaceTest1.HDR'}
      /> */}
      {/* <OrbitControls
        enablePan={false} maxDistance={10} minDistance={1.5}
      // maxPolarAngle={Math.PI / 2}
      // minPolarAngle={0}
      /> */}
      <CameraControls
        ref={cameraControlsRef}
        minDistance={1.5}
        maxDistance={10}
        enabled={true}
      />

      <CameraRig>
        {/* <Center> */}
        <group position={[-0, 0, 0]} ref={groupRef}>
          {snap.model === "" && snap.page !== PAGES.joinus && <Drums />}
          {snap.model === "Packs" && <Packs />}
          {snap.model === "Machines" && <Machines />}
          {snap.model === "Battles" && <Battles />}
          {snap.page === PAGES.joinus && snap.model === "" && <></>}
        </group>
        {/* </Center> */}
      </CameraRig>

      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.0} intensity={1} />
        {/* <DepthOfField target={[0, 0, 13]} focalLength={1} bokehScale={15} height={700} /> */}
      </EffectComposer>

      <BakeShadows />
    </>
  );
};

export default CanvasModel;
