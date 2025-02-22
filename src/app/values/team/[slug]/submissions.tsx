import { ImageWithFallback } from "@/components/image-with-fallback";
import { Submissions as _Submissions } from "@/lib/utils";
import { Check, CircleCheck, CircleX, Clock } from "lucide-react";

export default function Submissions(props: { submissions: _Submissions }) {
  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]">
      {props.submissions.map((sub) => (
        <div
          className="flex flex-row h-20 border border-zinc-800 rounded-lg"
          key={sub.id}
        >
          <ImageWithFallback
            src={`https://jbvalues.com/images/itemimages/${sub.itemId}.webp`}
            className="object-contain h-full w-fit aspect-square ml-4"
            fallbackSrc="/logo.webp"
            width={1024}
            height={1024}
          />
          <div className="flex flex-col w-full justify-between p-4">
            <div className="flex flex-row w-full justify-between">
              <span className="font-medium">{sub.itemName}</span>
              <span className="text-xs text-zinc-500 flex items-center gap-1">
                <Clock size={11} />
                {sub.time}
              </span>
            </div>
            <div className="flex flex-row w-full justify-between">
              <span className="font-semibold">
                $ {sub.value.toLocaleString()}
              </span>

              <span className="text-sm flex items-center gap-1">
                {sub.status}
                {sub.status === "Accepted" && (
                  <CircleCheck size={14} color="#37FF77" />
                )}
                {sub.status === "Outdated" && (
                  <Clock size={14} color="#FFCA4F" />
                )}
                {sub.status === "Declined" && (
                  <CircleX size={14} color="#ED5555" />
                )}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
