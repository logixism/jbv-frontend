"use client";

import { ImageWithFallback } from "@/components/image-with-fallback";
import { Clock, Eye, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function VTCard(props: {
  url: string;
  title: string;
  icon: string;
  description: string;
  banner: string;
  favorites: number;
  views: number;
  updated: string;
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div
      className="flex flex-row items-center justify-between h-40 overflow-clip border border-zinc-800 rounded-lg hover:scale-105 transition"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url('${props.banner}')`,
        backgroundSize: "cover",
      }}
    >
      <ImageWithFallback
        src={props.icon}
        fallbackSrc="/logo.webp"
        className="h-full w-fit object-cover aspect-square"
        width={150}
        height={150}
      />
      <div className="flex flex-col justify-between w-full h-full p-4">
        <Link href={props.url}>
          <div className="flex flex-row justify-between w-full">
            <h4 className="text-lg font-semibold text-zinc-200">
              {props.title}
            </h4>
            <span className="text-xs text-zinc-400 flex items-center gap-1">
              <Clock size={11} />
              {props.updated}
            </span>
          </div>
          <div>
            <p className="text-sm text-zinc-300 line-clamp-3 overflow-hidden mt-1">
              {props.description}
            </p>
          </div>
        </Link>
        <div className="flex flex-row justify-between">
          <span className="text-xs flex items-center gap-1 text-zinc-300">
            <Star
              size={18}
              color="#FFC800"
              fill={isFavorite ? "#FFC800" : "none"}
              className="cursor-pointer"
              // TODO: implement favoriting
              onClick={(e) => {
                setIsFavorite(!isFavorite);
              }}
            />
            {props.favorites}
          </span>
          <span className="text-xs text-zinc-300 flex items-center gap-1">
            <Eye size={18} color="#00AAFF" />
            {props.views}
          </span>
        </div>
      </div>
    </div>
  );
}
