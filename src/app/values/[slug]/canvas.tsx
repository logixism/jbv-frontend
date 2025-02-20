"use client";

import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";

export default function ThreeCanvas() {
  const model = useLoader(FBXLoader, "/proto.fbx");

  const [yRotation, setYRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setYRotation((yRotation + 0.0005) % (Math.PI * 2));
    }, 1);
    return () => clearInterval(interval);
  }, [yRotation, setYRotation]);

  return (
    <div className="h-55">
      <Canvas
        camera={{
          fov: 45,
          position: [0, -45, 185],
          up: [0, 1, 0],
        }}
      >
        <OrbitControls />
        <hemisphereLight intensity={3} />
        <pointLight position={[0, 40, 185]} intensity={5} decay={0.2} />
        <pointLight position={[0, -25, 185]} intensity={5} decay={2} />
        <mesh>
          <primitive object={model} />
        </mesh>
      </Canvas>
    </div>
  );
}
