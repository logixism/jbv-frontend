import { ImageWithFallback } from "@/components/image-with-fallback";
import { Items } from "@/lib/utils";
import { Submissions } from "@/lib/utils";
import FilteredValueList from "../../filtered-value-list";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
import ListOrSubs from "./list-or-subs";

export type VT = {
  listdata: {
    info: {
      banner: string;
      customUrl: string;
      description: string;
      icon: string;
      title: string;
    };
    stats: {
      favorites: number;
      updated: string;
      views: number;
    };
  };
  values: {
    [id: string]: {
      id: string;
      value: number;
      time: string;
      itemName: string;
    };
  };
  submissions: {
    [id: string]: {
      id: string;
      username: string;
      userid: string;
      userImage: string;
      reason: string;
      reviewerReason: string;
      status: string;
      value: number;
      date: number;
      time: string;
      submissionid: string;
      listName: string;
      listImage: string;
      itemName: string;
    };
  };
};

async function getVtItemsAsArray(vt: VT): Promise<Items | undefined> {
  const array = Object.entries(vt.values).map(([key, value]) => {
    return {
      id: key,
      name: value.itemName,
      // TODO: add demand to backend
      demand: "idk ryan give api",
      value: value.value,
    };
  });

  return array;
}
async function getVtSubmissionsAsArray(
  vt: VT
): Promise<Submissions | undefined> {
  const array = Object.entries(vt.submissions).map(([key, sub]) => {
    return {
      id: key,
      itemId: sub.id,
      time: sub.time,
      reason: sub.reason,
      reviewerReason: sub.reviewerReason,
      itemName: sub.itemName,
      status: sub.status,
      value: sub.value,
    };
  });

  return array;
}

export default async function VTPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const vtId = (await params).slug;
  const vt = (await (
    await fetch(`https://jbvalues.com/api/lists/${vtId}`)
  ).json()) as VT;
  const items = await getVtItemsAsArray(vt);
  const subs = await getVtSubmissionsAsArray(vt);

  return (
    <div>
      <div className="relative rounded-lg overflow-clip h-60">
        <ImageWithFallback
          src={vt.listdata.info.banner}
          className="-z-10"
          fallbackSrc="/logo.webp"
          width={2048}
          height={2048}
        />
        <div className="flex absolute inset-0 w-full h-full bg-zinc-900/70 backdrop-blur-md">
          <ImageWithFallback
            src={vt.listdata.info.icon}
            fallbackSrc="/logo.webp"
            className="h-full w-fit object-cover aspect-square"
            width={500}
            height={500}
          />
          <div className="p-4">
            <h2 className="font-bold text-3xl">{vt.listdata.info.title}</h2>
            <p className="text-zinc-300 mt-2">{vt.listdata.info.description}</p>
          </div>
        </div>
      </div>
      {items && subs ? (
        <ListOrSubs list={items} subs={subs} />
      ) : (
        <p>fetching items or submissions failed, try reloading the page</p>
      )}
    </div>
  );
}
