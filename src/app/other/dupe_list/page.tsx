"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Image from "next/image";
import {
  getCategoryFromId,
  getItemsAsArray,
  isDuped,
  Items,
} from "@/lib/utils";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ChevronsUpDown } from "lucide-react";

type DupeData = {
  [key: string]: string[];
};

async function getDupeData() {
  const res = await fetch("https://jbvalues.com/api/dupedata");
  const data: DupeData = await res.json();

  const uniqueData: DupeData = {};
  Object.entries(data).forEach(([key, value]) => {
    uniqueData[key] = Array.from(new Set(value));
  });

  return uniqueData;
}

function getItemDataFromId(id: string, items: Items) {
  return items.find((item) => item.id === id);
}

function highlightText(text: string, highlight: string) {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return parts.map((part, index) => (
    <span
      key={index}
      style={{
        color:
          part.toLowerCase() === highlight.toLowerCase()
            ? "#FE6467"
            : "inherit",
      }}
    >
      {part}
    </span>
  ));
}

export default function Page() {
  const [dupes, setDupes] = useState({} as DupeData);
  const [visibleDupes, setVisibleDupes] = useState([] as [string, string[]][]);
  const [items, setItems] = useState([] as Items);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getItemsAsArray().then(setItems);
  }, []);

  useEffect(() => {
    getDupeData().then(setDupes);
  }, []);

  useEffect(() => {
    const filteredDupes = Object.entries(dupes).filter(
      ([_, usernames]) =>
        search.length < 3 ||
        usernames.some((u) => u.toLowerCase().includes(search.toLowerCase()))
    );

    setVisibleDupes(filteredDupes);
  }, [search, dupes]);

  return (
    <div>
      <div className="mb-6 flex items-center flex-col border-zinc-800 border rounded-lg p-4">
        {/* here i think we can just keep it barebones, since we're moving away. for the vip server list, i'll work on it once i got time, way too busy these days */}
        <h1 className="font-bold text-3xl text-center">Jailbreak Dupe List</h1>
        <div className="flex items-center justify-center">
          <Image
            src={"https://jbvalues.com/images/jbvxjbtc4.png"}
            alt="JB Values x JBTC Logo"
            width={2048}
            height={2048}
            className="h-48 w-auto"
          />
        </div>
        <p className="text-center text-zinc-500">
          JBValues and{" "}
          <Link
            className="underline text-zinc-800 dark:text-zinc-200 hover:opacity-80 transition"
            href="https://discord.gg/jailbreaktrading"
          >
            JBTC
          </Link>{" "}
          have partnered to create a dupe list made to help you identify dupes
          while trading.
        </p>
      </div>
      <Input
        className="border-zinc-800"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid gap-4 grid-cols-1 mt-4">
        {visibleDupes.map(([key, usernames]) => (
          <Collapsible defaultOpen={true}>
            <Card
              key={key}
              className="p-4"
              style={{
                borderWidth: 1,
                borderColor:
                  search.length >= 3 &&
                  usernames.some((u) =>
                    u.toLowerCase().includes(search.toLowerCase())
                  )
                    ? "#FE6467"
                    : "bg-zinc-800",
              }}
            >
              <div className="flex flex-row items-center gap-3">
                <Image
                  src={`https://jbvalues.com/images/itemimages/${key}.webp`}
                  width={256}
                  height={256}
                  alt="item"
                  className="object-contain h-16 w-fit aspect-square"
                />
                <div className="flex flex-row w-full justify-between items-center">
                  <div>
                    <p className="text-sm">{getCategoryFromId(key)}</p>
                    <p className="font-semibold">
                      {getItemDataFromId(key, items)?.name}
                    </p>
                  </div>
                  <div>
                    <CollapsibleTrigger
                      asChild
                      className="flex flex-row items-center gap-2"
                    >
                      <Button variant="outline" size={"icon"}>
                        <ChevronsUpDown />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
              </div>
              <CollapsibleContent>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {usernames.map((username) => (
                    <p key={username} className="text-sm font-semibold">
                      {highlightText(username, search)}
                    </p>
                  ))}
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
        {search.length >= 3 && visibleDupes.length === 0 && (
          <p className="text-lg font-bold text-green-400">No dupes found!</p>
        )}
      </div>
    </div>
  );
}
