import React from 'react'
import { useTexture } from '@react-three/drei';
import * as THREE from 'three'

const Table = () => {

  const woodTexture = useTexture("/wood.png");
  woodTexture.repeat.x = 10;
  woodTexture.repeat.y = 10;

  woodTexture.wrapS = THREE.RepeatWrapping;
  woodTexture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <mesh position={[0, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 1]} >
        <planeBufferGeometry args={[10, 10]} />
        <meshLambertMaterial color="green" side={THREE.DoubleSide} map={woodTexture} />
      </mesh>

      <mesh rotation-x={-Math.PI / 2} receiveShadow position={[0, -0.09, 0]} castShadow>
        <planeBufferGeometry args={[100, 100]} attach="geometry" />
        <shadowMaterial attach="material" opacity={0.5} depthTest />
      </mesh>
    </>

  )
}

export default Table;