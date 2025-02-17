import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateChartData(
  item: {
    valuehistory: {
      [date: string]: number;
    };
  },
  overMonths: number = 6
) {
  const now = new Date();
  const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - overMonths));
  const chartData = Object.entries(item.valuehistory)
    .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
    .filter(([date]) => new Date(date) > sixMonthsAgo)
    .map(([date, value]) => ({
      date,
      value: value,
    }));

  return chartData;
}

export const categories = {
  s: "Spoiler",
  t: "Texture",
  r: "Rim",
  v: "Vehicle",
  c: "Color",
  hyper: "Hyperchrome",
};

export function getCategoryFromId(id: string) {
  for (const category in categories) {
    if (id.startsWith(category)) {
      return categories[category as keyof typeof categories];
    }
  }
  return "Category missing";
}

type Items = {
  id: string;
  name: string;
  value: number;
}[];

export async function getItemsAsArray(includeDupes = true) {
  const res = await fetch("https://jbvalues.com/api/items");
  const json = await res.json();

  const array = Object.entries(json)
    .filter(([key, value]) => includeDupes || !key.includes("duped"))
    .map(([key, value]) => {
      const item = value as {
        name: string;
        value: number;
      };

      return {
        id: key,
        name: item.name,
        value: item.value,
      };
    }) as Items;

  return array;
}
