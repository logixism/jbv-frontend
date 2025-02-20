"use client";

import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Button } from "./ui/button";

export type ChartData = { date: string; value: number }[];

const ranges = {
  "1W": 7,
  "1M": 30,
  "3M": 90,
  "1Y": 365,
  ALL: Infinity,
};

export default function Chart({
  chartData,
  showUi = true,
}: {
  chartData: ChartData;
  showUi?: boolean;
}) {
  const { theme } = useTheme();
  const [timeRange, setTimeRange] = useState<keyof typeof ranges>("3M");

  const filterDataByRange = (data: ChartData) => {
    const daysToShow = ranges[timeRange];

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToShow);

    return data.filter((point) => {
      const pointDate = new Date(point.date);
      return pointDate >= cutoffDate || timeRange === "ALL";
    });
  };

  const filteredData = filterDataByRange(chartData);

  const options: Highcharts.Options = {
    chart: {
      backgroundColor: "transparent",
      style: {
        fontFamily: "Montserrat, sans-serif",
      },
      zooming: {
        mouseWheel: {
          enabled: false,
        },
      },
    },
    title: {
      text: "",
    },
    xAxis: {
      visible: showUi,
      categories: filteredData.map((point) => point.date),
      labels: {
        style: {
          color: theme === "dark" ? "#d4d4d4" : "#3f3f46",
        },
        autoRotation: [0, -3, -6, -9, -12],
      },
      gridLineWidth: 0,
    },
    yAxis: {
      visible: showUi,
      title: {
        text: null,
      },
      labels: {
        style: {
          color: theme === "dark" ? "#d4d4d4" : "#3f3f46",
        },
      },
      gridLineWidth: 0,
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: false,
        },
        lineWidth: 1.5,
      },
    },
    legend: {
      enabled: showUi,
      itemStyle: {
        color: theme === "dark" ? "#FAFAFA" : "#09090B",
      },
    },
    series: [
      {
        type: "spline",
        name: "Value",
        data: filteredData.map((point) => point.value),
        color: theme === "dark" ? "#FAFAFA" : "#09090B",
        marker: {
          enabled: false,
        },
      },
    ],
    tooltip: {
      backgroundColor: theme === "dark" ? "#151517" : "#F4F4F5",
      style: {
        color: theme === "dark" ? "#FFFFFF" : "#000000",
      },
      shared: true,
      headerFormat: "<b>{point.key}</b><br/>",
      pointFormat: "{series.name}: ${point.y:,.0f}",
    },
    credits: {
      enabled: false,
    },
  };

  return (
    <div className="w-full h-full">
      {showUi && (
        <div className="flex gap-2 mb-4 justify-end">
          {Object.keys(ranges).map((range) => (
            <Button
              variant={range === timeRange ? "default" : "outline"}
              key={range}
              onClick={() => setTimeRange(range as keyof typeof ranges)}
            >
              {range}
            </Button>
          ))}
        </div>
      )}
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
