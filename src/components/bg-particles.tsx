"use client";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function BGParticles() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const { theme } = useTheme();

  return (
    <div className="absolute w-screen h-screen -z-10">
      {init && (
        <Particles
          id="tsparticles"
          options={{
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "grab",
                },
              },
              modes: {
                grab: {
                  distance: 200,
                },
              },
            },
            particles: {
              number: {
                value: 100,
              },
              move: {
                enable: true,
              },
              size: {
                value: 2,
              },
              shape: {
                type: "circle",
              },
              color: {
                value: theme === "dark" ? "#fff" : "#000",
              },
              links: {
                enable: false,
                distance: 150,
                color: theme === "dark" ? "#fff" : "#000",
                opacity: 0.2,
              },
            },
          }}
        />
      )}
    </div>
  );
}
