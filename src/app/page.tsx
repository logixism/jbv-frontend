"use client";

import Chart from "@/components/chart";
import {
  AccordionContent,
  Accordion,
  AccordionTrigger,
  AccordionItem,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { generateChartData } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Line, LineChart } from "recharts";
import { useLocalStorage } from "usehooks-ts";

import Autoplay from "embla-carousel-autoplay";
import { Card } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/image-with-fallback";
import { Separator } from "@/components/ui/separator";

type TorpedoData = {
  valuehistory: {
    [date: string]: number;
  };
  value: number;
};
type ChartData = { date: string; value: number }[];
type RecentChanges = {
  time: string;
  submissionid: string;
  listName: string;
  listImage: string;
  itemName: string;
  value: number;
  id: string;
}[];

async function getTorpedoData(): Promise<TorpedoData> {
  const res = await fetch("https://jbvalues.com/api/itemdata/v0");
  const json = await res.json();

  return json;
}

async function getRecentChanges(): Promise<RecentChanges> {
  const res = await fetch("https://jbvalues.com/api/recentsubmissions/100");
  const json = await res.json();

  const lastRecentChanges = json.slice(0, 25);
  return lastRecentChanges;
}

const fallbackChartData = [
  { date: "January", value: 186 },
  { date: "February", value: 305 },
  { date: "March", value: 237 },
  { date: "April", value: 73 },
  { date: "May", value: 209 },
  { date: "June", value: 214 },
];

const chartConfig = {
  value: {
    label: "Value",
  },
} satisfies ChartConfig;

export default function Home() {
  const [unofficialWarningOpen, setUnofficialWarningOpen] = useLocalStorage(
    "unofficialWarningOpen",
    true
  );

  const [torpedoData, setTorpedoData] = useState<TorpedoData>();
  const [chartData, setChartData] = useState<ChartData>();
  const [recentChanges, setRecentChanges] = useState<RecentChanges>([]);

  useEffect(() => {
    async function fetchData() {
      const data = (await getTorpedoData()) as TorpedoData;

      if (!data) {
        return;
      }

      setTorpedoData(data);

      setChartData(generateChartData(data, 12));

      setRecentChanges((await getRecentChanges()) as RecentChanges);
    }

    fetchData();
  }, []);

  return (
    <div>
      <AlertDialog open={unofficialWarningOpen}>
        <AlertDialogTitle />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex flex-row items-center">
              <TriangleAlert />
              <p className="ml-2">Warning</p>
            </AlertDialogTitle>
            <AlertDialogDescription>
              Looks like you&apos;ve found the new website for JBValues. This is
              still a work-in-progress, so we recommend going to the official
              one for the time being.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="cursor-pointer"
              onClick={() => setUnofficialWarningOpen(false)}
            >
              I&apos;ll stay
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer"
              onClick={() => (window.location.href = "https://jbvalues.com")}
            >
              Send me to the official website
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex max-w-150">
        {/* <Image
          src="/trade_island.png"
          width={300}
          height={300}
          alt="trade island image"
        /> */}
        <div className="ml-4">
          <h1 className="font-bold text-4xl">JBValues</h1>
          <p>
            We are a ROBLOX Jailbreak trading website with a variety of features
            made to assist you in trading. These include a value list, a value
            calculator, a dupe list, and much more!
          </p>
        </div>
      </div>
      <div className="flex flex-col text-center mt-12 w-full">
        <h2 className="font-semibold text-3xl ">We provide</h2>
        <p>Some tools and metrics for you to use</p>
        <div className="flex mt-12 md:flex-row flex-col md:justify-between items-center">
          <div className="outline-1 p-4 text-left outline-zinc-800 rounded-lg w-100 h-60 max-h-60">
            <h4 className="text-sm">Values</h4>
            <h2 className="font-bold">Torpedo value over the last 3 months</h2>
            <Chart showUi={false} chartData={chartData ?? fallbackChartData} />
          </div>
          <div className="outline-1 p-4 text-left outline-zinc-800 rounded-lg w-100 h-60 max-h-60">
            <h4 className="text-sm ">Calculator</h4>
            <h2 className="font-bold">Least rich JBValues user</h2>
            <div>
              <div className="flex flex-row mt-4 justify-between">
                <p className="font-medium">Torpedo x3</p>
                <p className="font-bold dark:text-zinc-200">
                  {torpedoData?.value
                    ? `$ ${(torpedoData?.value * 3).toLocaleString()}`
                    : "loading..."}
                </p>
              </div>
              <div className="flex flex-row mt-2 justify-between">
                <p className="font-medium">Torpedo x5</p>
                <p className="font-bold dark:text-zinc-200">
                  {torpedoData?.value
                    ? `$ ${(torpedoData?.value * 5).toLocaleString()}`
                    : "loading..."}
                </p>
              </div>
              <div className="flex flex-row mt-2 justify-between">
                <p className="font-medium">Torpedo x10</p>
                <p className="font-bold dark:text-zinc-200">
                  {torpedoData?.value
                    ? `$ ${(torpedoData?.value * 10).toLocaleString()}`
                    : "loading..."}
                </p>
              </div>
              <div className="border-t border-zinc-800 my-4" />
              <div className="flex flex-row justify-between">
                <p className="font-medium">Total</p>
                <p className="font-bold dark:text-zinc-200">
                  {torpedoData?.value
                    ? `$ ${(torpedoData?.value * 18).toLocaleString()}`
                    : "loading..."}
                </p>
              </div>
            </div>
          </div>{" "}
          <div className="outline-1 p-4 text-left outline-zinc-800 rounded-lg w-100 h-60 max-h-60">
            <h4 className="text-sm">Dupe list</h4>
            <h2 className="font-bold">Is that item a dupe..?</h2>
            <div>
              <div className="flex flex-row mt-4 justify-between">
                <p className="font-medium">logixism&apos;s P1</p>
                <p className="font-bold dark:text-red-400 text-red-500">
                  Duped
                </p>
              </div>
              <div className="flex flex-row mt-4 justify-between">
                <p className="font-medium">deimp12&apos;s Pickup</p>
                <p className="font-bold dark:text-red-400 text-red-500">
                  Duped
                </p>
              </div>
              <div className="flex flex-row mt-4 justify-between">
                <p className="font-medium">cancle5&apos;s Parisian</p>
                <p className="font-bold dark:text-red-400 text-red-500">
                  Duped
                </p>
              </div>
              <div className="flex flex-row mt-4 justify-between">
                <p className="font-medium">zain&apos;s Administrator</p>
                <p className="font-bold dark:text-green-300 text-green-500">
                  Not duped
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col text-center mt-12 w-full">
        <h2 className="font-semibold text-3xl ">Our reviews</h2>
        <p>See who endorses us and what they have to say</p>

        <Carousel
          className="mt-12"
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
        >
          <CarouselContent>
            {[
              {
                name: "Samantha",
                image: `https://picsum.photos/${512 + 1}`,
                testimonial:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.",
              },
              {
                name: "Elijah",
                image: `https://picsum.photos/${512 + 2}`,
                testimonial:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.",
              },
              {
                name: "Ava",
                image: `https://picsum.photos/${512 + 3}`,
                testimonial:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.",
              },
              {
                name: "Olivia",
                image: `https://picsum.photos/${512 + 4}`,
                testimonial:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.",
              },
              {
                name: "Sophia",
                image: `https://picsum.photos/${512 + 5}`,
                testimonial:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.",
              },
              {
                name: "Mia",
                image: `https://picsum.photos/${512 + 6}`,
                testimonial:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.",
              },
              {
                name: "Isabella",
                image: `https://picsum.photos/${512 + 7}`,
                testimonial:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.",
              },
              {
                name: "Charlotte",
                image: `https://picsum.photos/${512 + 8}`,
                testimonial:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.",
              },
              {
                name: "Amelia",
                image: `https://picsum.photos/${512 + 9}`,
                testimonial:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.",
              },
              {
                name: "Harper",
                image: `https://picsum.photos/${512 + 10}`,
                testimonial:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.",
              },
            ].map((testimonial) => (
              <CarouselItem className="basis-1/3" key={testimonial.name}>
                <Card className="p-4 h-60">
                  <div className="flex flex-col items-center">
                    <Image
                      src={testimonial.image}
                      width={75}
                      height={75}
                      className="rounded-full"
                      alt={testimonial.name}
                    />
                    <p className="font-bold text-2xl my-3">
                      {testimonial.name}
                    </p>
                    <p className="text-zinc-500">{testimonial.testimonial}</p>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="flex flex-col text-center mt-12">
        <h2 className="font-semibold text-3xl">Recent Value Changes</h2>
        <p>Our value team's hard work</p>

        <div className="flex w-full items-center justify-center">
          <Carousel
            className="mt-12 w-[95%]"
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {recentChanges.map((change) => (
                <CarouselItem className="basis-1/3" key={change.submissionid}>
                  <Card className="p-3">
                    <div className="flex flex-col h-full w-full">
                      <ImageWithFallback
                        src={`https://jbvalues.com/images/itemimages/${change.id}.webp`}
                        width={256}
                        height={256}
                        className="rounded-full h-18 w-full object-contain"
                        fallbackSrc="/logo.webp"
                        alt="..."
                      />
                      <div className="w-full h-full flex flex-row justify-between items-center mt-2">
                        <div className="h-full flex flex-row items-center">
                          <span className="font-medium">{change.itemName}</span>
                        </div>
                        <div className="h-full flex flex-row items-center gap-2">
                          <ImageWithFallback
                            width={512}
                            height={512}
                            src={change.listImage}
                            fallbackSrc="/logo.webp"
                            className="w-4 rounded-full"
                          />
                          <span className="text-sm">{change.listName}</span>
                        </div>
                      </div>
                      <Separator className="my-2" />
                      <div className="w-full flex flex-row justify-between">
                        <span className="font-semibold">
                          $ {change.value.toLocaleString()}
                        </span>
                        <span>{change.time}</span>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      <div className="flex flex-col text-center mt-12 w-full">
        <h2 className="font-semibold text-3xl">Quick FAQ</h2>
        <p>Find out about our mission</p>

        <div className="text-left">
          <Accordion type="single">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do we determine values?</AccordionTrigger>
              <AccordionContent>
                Our values are determined by averaging inputs from some of the
                most experienced and reputable traders in the community, who
                form our value team. They discusses values daily and
                participates in meetings approximately twice a week to go over
                market changes. Based on the discussions and analyses, value
                team members make submissions that include reasoning to explain
                the submitted value. Each submission undergoes a thorough review
                to ensure it is reasonable and unbiased before it can impact an
                item&apos;s value. Only those submissions that meet these
                criteria are accepted.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Where does item information come from?
              </AccordionTrigger>
              <AccordionContent>
                All item information is sourced from official data provided by
                Badimo, or other trustworthy sources such as the Jailbreak
                Fandom.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is JB Values 100% accurate?</AccordionTrigger>
              <AccordionContent>
                Although it is impossible for a value list to be 100% accurate,
                as the market is constantly changing and is subjective to each
                trader, our team works extremely hard to provide you with the
                most accurate information possible.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                How often is JB Values updated?
              </AccordionTrigger>
              <AccordionContent>
                Submissions are created daily, and values are updated based off
                them every 6 minutes. While there will always be delays as we
                research changes prior to rolling them out, our goal is to
                update you on them as soon as possible.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>
                What if an item is not on JB Values?
              </AccordionTrigger>
              <AccordionContent>
                We try to add as many items as we possibly can, but primarily
                focus on having items that are popular and have a clear value.
                If you feel like there isn&apos;t an item on our value list that
                should be added, you can fill out our item request form.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
