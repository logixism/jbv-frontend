"use client";

import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";

export default function ThreeCanvas() {
  const model = useLoader(FBXLoader, "/protov2.fbx");

  const [yRotation, setYRotation] = useState(1.75);

  useEffect(() => {
    const interval = setInterval(() => {
      setYRotation((yRotation + 0.0005) % (Math.PI * 2));
    }, 1);
    return () => clearInterval(interval);
  }, [yRotation, setYRotation]);

  return (
    <Canvas
      camera={{
        fov: 40,
        position: [0, -45, 0],
        up: [0, 1, 0],
        zoom: 3
      }}
      >
      <OrbitControls 
        minPolarAngle={1.35}
        maxPolarAngle={1.35}
        enableZoom={false}
      />
      <ambientLight color={"#FFFFFF"} />

      <hemisphereLight
        color={"#00AAFF"}
        groundColor={"#FFAA00"}
        intensity={12}
      />
      <mesh rotation={[0, yRotation, 0]}>
        <primitive object={model} />
      </mesh>
    </Canvas>
  );
}
