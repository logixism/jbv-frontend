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
  t: "Tire",
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
