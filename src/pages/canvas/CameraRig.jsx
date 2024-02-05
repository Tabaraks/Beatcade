import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import * as THREE from "three";
import state from "../../store";

const CameraRig = ({ children }) => {
  const group = useRef();
  const snap = useSnapshot(state);

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    // set the initial position of the model
    let targetPosition = [0, 0, 2];

    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0.2, 2.5];
      easing.damp3(state.camera.position, targetPosition, 0.25, delta);
      state.camera.lookAt(new THREE.Vector3(0, 0, 0));
    } else {
    }

    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 20, -state.pointer.x / 10, 0],
      0.25,
      delta
    );
  });
  return <group ref={group}>{children}</group>;
};

export default CameraRig;
