import Image from "next/image";

import { Line, LineChart } from "recharts";
import Chart from "@/components/chart";
import { generateChartData, getCategoryFromId } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  FaCashRegister,
  FaHands,
  FaHandshake,
  FaHandSparkles,
  FaMagic,
  FaMoneyBill,
  FaTransgender,
} from "react-icons/fa";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/image-with-fallback";
import { Separator } from "@/components/ui/separator";

export type Item = {
  id: string;
  name: string;
  description?: string;
  value: number;
  price?: number;
  maxSpeed?: number;
  valuehistory: {
    [date: string]: number;
  };

  monthlyTraded?: number;
  monthlyUnique?: number;
};

type ItemSubmission = {
  date: number;
  itemId: string;
  itemName: string;
  reason: string;
  status: string;
  value: number;
  username: string;
  userImage: string;
  listImage: string;
  userId: string;
  time: string;
  id: string;
};

async function getItemData(id: string) {
  const res = await fetch(`https://jbvalues.com/api/itemdata/${id}`);
  const json = await res.json();

  return json;
}

async function getItemSubmissions(id: string) {
  const res = await fetch(`https://jbvalues.com/api/submissions/item/${id}`);
  const json = await res.json();

  return json;
}

export default async function Item({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const itemId = (await params).slug;
  const itemData = (await getItemData(itemId)) as Item;
  const itemSubmissions = (await getItemSubmissions(
    itemId
  )) as ItemSubmission[];

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col text-center justify-center items-center max-w-150">
        <Image
          className="h-80 object-contain"
          src={`https://jbvalues.com/images/itemimages/${itemId}.webp`}
          width={1024}
          height={1024}
          alt={itemData.name}
        />

        <div className="mt-4 text-left w-full">
          <div className="flex flex-row">
            <h2 className="text-2xl w-full">{itemData.name}</h2>
            <Badge variant={"outline"} className="w-32 text-center">
              <span className="text-center w-full">
                {getCategoryFromId(itemId)}
              </span>
            </Badge>
          </div>
          <p className="mt-2 text-sm dark:text-zinc-400 text-zinc-600">
            {itemData.description}
          </p>
        </div>

        <Separator className="my-4" orientation="horizontal" />

        <div className="flex flex-col justify-between w-full">
          <div className="flex flex-row justify-between">
            <div className="flex space-x-2 items-center flex-row">
              <FaMoneyBill />
              <p>Value</p>
            </div>
            <p className="font-bold">$ {itemData.value.toLocaleString()}</p>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex space-x-2 items-center flex-row">
              <FaMagic />
              <p>Monthly Unique</p>
            </div>
            <p className="font-bold">
              ${" "}
              {itemData.monthlyUnique
                ? itemData.monthlyUnique.toLocaleString()
                : "N/A"}
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex space-x-2 items-center flex-row">
              <FaHandshake />
              <p>Monthly Traded</p>
            </div>
            <p className="font-bold">
              ${" "}
              {itemData.monthlyTraded
                ? itemData.monthlyTraded.toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>

        <div className="mt-8 w-full h-72">
          <Chart chartData={generateChartData(itemData)} />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full mt-4" variant="outline">
              View recent submissions
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px]">
            <DialogHeader>
              <DialogTitle>Recent submissions</DialogTitle>
              <DialogDescription>
                Here are the most recent submissions for {itemData.name}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              {itemSubmissions
                .sort((a, b) => b.date - a.date)
                .slice(0, 3)
                .map((submission) => (
                  <div
                    key={submission.date}
                    className="flex flex-row border border-zinc-800 h-16 rounded-lg overflow-clip"
                  >
                    <ImageWithFallback
                      alt="submitter profile picture"
                      className="w-fit h-full object-contain"
                      width={128}
                      height={128}
                      src={submission.userImage}
                      fallbackSrc={submission.listImage}
                    />
                    <div className="m-2 w-full space-y-1">
                      <div className="flex flex-row justify-between w-full">
                        <p className="text-sm dark:text-zinc-400">
                          {submission.username}
                        </p>
                      </div>
                      <div className="flex flex-row justify-between w-full">
                        <h5 className="font-semibold">
                          $ {submission.value.toLocaleString()}
                        </h5>
                        <p className="text-sm dark:text-zinc-400">
                          {submission.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
