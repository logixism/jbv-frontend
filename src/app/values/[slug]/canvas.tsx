"use client";

import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";

export default function ThreeCanvas() {
  const model = useLoader(FBXLoader, "/proto.fbx");

  model.traverseVisible((object) => {
    if (object instanceof THREE.Mesh) {
      object.material = new THREE.MeshPhysicalMaterial({
        color: 0xcccccc,
        clearcoat: 0.2,
        roughness: 0.45,
        reflectivity: 1,
        metalness: 1,
      });
    }
  });

  const [yRotation, setYRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setYRotation((yRotation + 0.0005) % (Math.PI * 2));
    }, 1);
    return () => clearInterval(interval);
  }, [yRotation, setYRotation]);

  return (
    <Canvas
      camera={{
        fov: 60,
        position: [0, 0, 150],
        up: [0, 1, 0],
      }}
    >
      <pointLight position={[0, 50, -50]} intensity={10} decay={0.5} />
      <pointLight position={[0, 50, 150]} intensity={10} decay={0.5} />
      <mesh rotation={[0.5, yRotation, 0]}>
        <primitive object={model} />
      </mesh>
    </Canvas>
  );
}
