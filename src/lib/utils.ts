import { clsx, type ClassValue } from "clsx";
import { url } from "inspector";
import {
  Calculator,
  Copy,
  Globe,
  HelpCircle,
  Home,
  Lock,
  Repeat,
  Users,
} from "lucide-react";
import { FaDiscord, FaTwitter } from "react-icons/fa";
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
  overMonths: number = 1000
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
  demand: string;
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

export const navigation = {
  mainNav: [
    {
      title: "Main",
      items: [
        {
          icon: Home,
          title: "Home",
          description:
            "The main page of the website, with information about the website and its features",
          url: "/",
        },
        {
          icon: HelpCircle,
          title: "FAQ",
          description:
            "Answers to frequently asked questions about the website and its features",
          url: "/faq",
        },
      ],
    },
    {
      title: "Values",
      items: [
        {
          icon: Globe,
          title: "List",
          description: "A list of all items and their values",
          url: "/values",
        },
        {
          icon: Calculator,
          title: "Calculator",
          description: "A tool for calculating the value of items",
          url: "/tools/calculator",
        },
        {
          icon: Users,
          title: "Team",
          description: "The team behind the JBV Values",
          url: "/values/team",
        },
        {
          icon: Repeat,
          title: "Recent Changes",
          description: "A list of our recent value changes",
          url: "/values/changes",
        },
      ],
    },
    {
      title: "Other",
      items: [
        {
          icon: Lock,
          title: "Private Servers",
          description: "Free JBV-sponsored private servers",
          url: "/other/private_servers",
        },
        {
          icon: Copy,
          title: "Dupe List",
          description: "A list of duped items",
          url: "/other/dupe_list",
        },
      ],
    },
  ],
  socials: [
    {
      name: "Discord",
      icon: FaDiscord,
      url: "https://discord.com/invite/jbvalues",
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      url: "https://twitter.com/jbvalues",
    },
  ],
};
