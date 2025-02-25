"use client";

import { ImageWithFallback } from "@/components/image-with-fallback";
import { CircleCheck, CircleX, Clock, Eye, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Change } from "./page";
import { getCategoryFromId, isDuped } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ChangeCard(props: { change: Change }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { change } = props;

  return (
    <div className="w-full h-fit outline outline-zinc-800 rounded-lg p-4 transition duration-150 ease-in-out">
      <div className="flex justify-between items-start">
        <span className="text-sm">{getCategoryFromId(change.id)}</span>
        <span className="text-xs text-zinc-500 flex items-center gap-1">
          <Clock size={11} />
          {change.time}
        </span>
      </div>

      <div className="flex flex-row justify-between items-center space-x-4">
        <h4 className="text-lg font-semibold">{change.itemName}</h4>
        {isDuped(change.id) && <Badge variant="destructive">Duped</Badge>}
      </div>

      <ImageWithFallback
        className="py-4 h-44 w-full object-contain"
        width={1024}
        height={1024}
        src={`https://jbvalues.com/images/itemimages/${change.id}.webp`}
        fallbackSrc="/logo.webp"
        alt={`an image of ${change.itemImage}`}
      />

      <div className="flex flex-row space-x-2 items-center justify-center">
        <p className="font-bold text-sm">{change.listName}</p>
        <ImageWithFallback
          src={change.userImage}
          className="w-8 h-8 object-contain rounded-full"
          fallbackSrc="/logo.webp"
          width={256}
          height={256}
        />
      </div>

      <Separator className="my-2" />

      <div className="flex flex-row justify-between">
        <p>Status</p>
        <p className="font-semibold flex flex-row items-center gap-2">
          {change.status}
          {change.status === "Accepted" && (
            <CircleCheck size={14} color="#37FF77" />
          )}
          {change.status === "Outdated" && <Clock size={14} color="#FFCA4F" />}
          {change.status === "Declined" && (
            <CircleX size={14} color="#ED5555" />
          )}
        </p>
      </div>

      <div className="flex flex-row justify-between">
        <p>Date</p>
        <p className="font-semibold">
          {new Date(change.date).toLocaleDateString()}
        </p>
      </div>

      <div className="flex flex-row justify-between">
        <p>Value</p>
        <p className="font-semibold">$ {change.value.toLocaleString()} </p>
      </div>

      <div className="flex flex-row justify-between">
        <p>Impact</p>
        <p className="font-semibold">{change.impact}%</p>
      </div>
    </div>
  );
}
