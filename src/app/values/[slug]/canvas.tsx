"use client";

import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { Canvas } from "@react-three/fiber";
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
    <div className="h-55 w-full">
        <Canvas
          camera={{
            fov: 40,
            position: [0, -45, 225],
            up: [0, 1, 0],
          }}
        >
          <pointLight position={[0, 100, 10]} intensity={100} decay={0.4} />
          <pointLight position={[0, 50, 50]} intensity={5} decay={1} />
          <mesh rotation={[0.5, yRotation, 0]}>
            <primitive object={model} />
          </mesh>
        </Canvas>
    </div>
  );
}
