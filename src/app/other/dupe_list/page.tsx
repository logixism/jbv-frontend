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
  const [items, setItems] = useState([] as Items);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getItemsAsArray().then(setItems);
  }, []);

  useEffect(() => {
    getDupeData().then(setDupes);
  }, []);

  return (
    <div>
      <Input placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
      <div className="grid gap-4 grid-cols-1 mt-4">
        {Object.entries(dupes)
          .filter(
            ([_, usernames]) =>
              search.length < 3 ||
              usernames.some((u) =>
                u.toLowerCase().includes(search.toLowerCase())
              )
          )
          .map(([key, usernames]) => (
            <Card
              key={key}
              className="p-4"
              style={{
                borderColor:
                  search.length >= 3 &&
                  usernames.some((u) =>
                    u.toLowerCase().includes(search.toLowerCase())
                  )
                    ? "#FE6467"
                    : "inherit",
              }}
            >
              <Collapsible open={true}>
                <CollapsibleTrigger asChild>
                  <div className="flex flex-row items-center gap-3">
                    <Image
                      src={`https://jbvalues.com/images/itemimages/${key}.webp`}
                      width={256}
                      height={256}
                      alt="item"
                      className="object-contain h-16 w-fit aspect-square"
                    />
                    <div>
                      <p className="text-sm">{getCategoryFromId(key)}</p>
                      <p>{getItemDataFromId(key, items)?.name}</p>
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {usernames.map((username) => (
                      <p key={username} className="text-sm font-semibold">
                        {highlightText(username, search)}
                      </p>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
      </div>
    </div>
  );
}
