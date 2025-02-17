"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { Line, LineChart } from "recharts";

type TorpedoData = {
  valuehistory: {
    [date: string]: number;
  };
  value: number;
};
type ChartData = { date: string; value: number }[];

async function getTorpedoData(): Promise<TorpedoData> {
  const res = await fetch("https://jbvalues.com/api/itemdata/v0");
  const json = await res.json();

  return json;
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
    color: "#E4E4E7",
  },
} satisfies ChartConfig;

export default function Home() {
  const [torpedoData, setTorpedoData] = useState<TorpedoData>();
  const [chartData, setChartData] = useState<ChartData>();

  useEffect(() => {
    async function fetchData() {
      const data = (await getTorpedoData()) as TorpedoData;

      if (!data) {
        return;
      }

      setTorpedoData(data);

      const chartData = Object.entries(data.valuehistory)
        .filter(([], index, self) => index % 7 === 0 && index < self.length - 7)
        .map(([date, value]) => ({
          date,
          value: Number(value),
        }));

      setChartData(chartData);
    }

    fetchData();
  }, []);

  return (
    <div>
      <div className="max-w-130">
        <h1 className="text-zinc-50 font-bold text-4xl">JBValues</h1>
        <p>
          We are a ROBLOX Jailbreak trading website with a variety of features
          made to assist you in trading. These include a value list, a value
          calculator, a dupe list, and much more!
        </p>
      </div>
      <div className="flex flex-col text-center mt-12 w-full">
        <h2 className="font-semibold text-3xl">We provide</h2>
        <div className="flex mt-12 md:flex-row flex-col md:justify-between items-center">
          <div className="outline-1 p-4 text-left outline-zinc-800 rounded-lg w-100 h-60 max-h-60">
            <h4 className="text-sm text-zinc-50">Values</h4>
            <h2 className="font-bold text-zinc-50">Torpedo value over time</h2>
            <ChartContainer config={chartConfig} className="pt-8 h-40 w-full">
              <LineChart
                accessibilityLayer
                data={chartData || fallbackChartData}
              >
                <Line
                  dataKey="value"
                  type="natural"
                  stroke="var(--color-value)"
                  strokeWidth={2}
                  dot={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel hideIndicator />}
                />
              </LineChart>
            </ChartContainer>
          </div>
          <div className="outline-1 p-4 text-left outline-zinc-800 rounded-lg w-100 h-60 max-h-60">
            <h4 className="text-sm text-zinc-50">Calculator</h4>
            <h2 className="font-bold text-zinc-50">Least rich JBValues user</h2>
            <div>
              <div className="flex flex-row mt-4 justify-between">
                <p className="font-semibold text-zinc-50">Torpedo x3</p>
                <p className="font-bold text-zinc-200">
                  {torpedoData?.value
                    ? `$ ${(torpedoData?.value * 3).toLocaleString()}`
                    : "loading..."}
                </p>
              </div>
              <div className="flex flex-row mt-2 justify-between">
                <p className="font-semibold text-zinc-50">Torpedo x5</p>
                <p className="font-bold text-zinc-200">
                  {torpedoData?.value
                    ? `$ ${(torpedoData?.value * 5).toLocaleString()}`
                    : "loading..."}
                </p>
              </div>
              <div className="flex flex-row mt-2 justify-between">
                <p className="font-semibold text-zinc-50">Torpedo x10</p>
                <p className="font-bold text-zinc-200">
                  {torpedoData?.value
                    ? `$ ${(torpedoData?.value * 10).toLocaleString()}`
                    : "loading..."}
                </p>
              </div>
              <div className="border-t border-zinc-800 my-4" />
              <div className="flex flex-row justify-between">
                <p className="font-semibold text-zinc-50">Total</p>
                <p className="font-bold text-zinc-200">
                  {torpedoData?.value
                    ? `$ ${(torpedoData?.value * 18).toLocaleString()}`
                    : "loading..."}
                </p>
              </div>
            </div>
          </div>{" "}
          <div className="outline-1 p-4 text-left outline-zinc-800 rounded-lg w-100 h-60 max-h-60">
            <h4 className="text-sm text-zinc-50">Dupe list</h4>
            <h2 className="font-bold text-zinc-50">Is that item a dupe..?</h2>
            <div>
              <div className="flex flex-row mt-4 justify-between">
                <p className="font-semibold text-zinc-50">logixism&apos;s P1</p>
                <p className="font-bold text-red-400">Duped</p>
              </div>
              <div className="flex flex-row mt-4 justify-between">
                <p className="font-semibold text-zinc-50">
                  deimp12&apos;s Pickup
                </p>
                <p className="font-bold text-red-400">Duped</p>
              </div>
              <div className="flex flex-row mt-4 justify-between">
                <p className="font-semibold text-zinc-50">
                  cancle5&apos;s Parision
                </p>
                <p className="font-bold text-red-400">Duped</p>
              </div>
              <div className="flex flex-row mt-4 justify-between">
                <p className="font-semibold text-zinc-50">
                  zain&apos;s Administrator
                </p>
                <p className="font-bold text-green-300">Not duped</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
