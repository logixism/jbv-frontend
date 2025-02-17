"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export type ChartData = { date: string; value: number }[];

const chartConfig = {
  value: {
    label: "Value",
  },
} satisfies ChartConfig;

export default function Chart({ chartData }: { chartData: ChartData }) {
  return (
    <ChartContainer config={chartConfig} className="h-40 w-full">
      <LineChart accessibilityLayer data={chartData}>
        <Line
          dataKey="value"
          type="natural"
          stroke="var(--chart-1)"
          strokeWidth={2}
          dot={false}
        />
        <CartesianGrid stroke="var(--border)" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideIndicator />}
        />
      </LineChart>
    </ChartContainer>
  );
}
