"use client";

import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useCountdown, useInterval } from "usehooks-ts";

export default function ThreeCanvas() {
  const model = useLoader(FBXLoader, "/protov2.fbx");

  const [yRotation, setYRotation] = useState(1.75);
  const [timeSinceMovedManually, setTimeSinceMovedManually] = useState(999);

  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 1.5,
      countStop: 0,
      intervalMs: 500,
    });

  useEffect(() => {
    startCountdown();
  });

  useInterval(() => {
    setTimeSinceMovedManually(timeSinceMovedManually + 1);
  }, 1000);

  useInterval(() => {
    console.log(timeSinceMovedManually);
    if (timeSinceMovedManually > 3) {
      setYRotation((yRotation + 0.001) % (Math.PI * 2));
    }
  }, 10);

  return (
    <Canvas
      gl={{
        antialias: true,
      }}
      camera={{
        fov: 40,
        position: [0, -45, 0],
        up: [0, 1, 0],
        zoom: 3,
      }}
    >
      <OrbitControls
        onChange={() => {
          if (count === 0) {
            setTimeSinceMovedManually(0);
          }
        }}
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
