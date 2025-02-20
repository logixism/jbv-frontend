"use client";

import { ImageWithFallback } from "@/components/image-with-fallback";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import ThreeCanvas from "./canvas";

export default function ModelOrImage({ id }: { id: string }) {
  const [modelExists, setModelExists] = useState<boolean>(false);

  useEffect(() => {
    const checkModelExists = async () => {
      try {
        const response = await fetch(`/models/${id}.fbx`, {
          method: "HEAD",
        });
        setModelExists(response.ok);
      } catch (error) {
        console.warn("Error checking model existence:", error);
        setModelExists(false);
      }
    };

    checkModelExists();
  }, [id]);

  return (
    <>
      {modelExists ? (
        <div className="h-64 w-full">
          <ThreeCanvas file={`/models/${id}.fbx`} />
        </div>
      ) : (
        <ImageWithFallback
          className="h-80 object-contain"
          src={`https://jbvalues.com/images/itemimages/${id}.webp`}
          fallbackSrc="/logo.webp"
          width={1024}
          height={1024}
          alt={id}
        />
      )}
    </>
  );
}
