"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, getCategoryFromId, getItemsAsArray } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";

function isDuped(id: string) {
  return id.includes("duped");
}

function Item(props: {
  data: {
    id: string;
    name: string;
    value: number;
  };
}) {
  return (
    <a href={`/values/${props.data.id}`} className="cursor-pointer">
      <div className="w-72 h-72 outline outline-zinc-800 rounded-lg p-4 transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
        <span className="text-sm">{getCategoryFromId(props.data.id)}</span>
        <div className="flex flex-row items-center space-x-4">
          <h4 className="text-lg font-semibold">{props.data.name}</h4>
          {isDuped(props.data.id) && <Badge variant="destructive">Duped</Badge>}
        </div>

        <Image
          className="py-4 h-48 w-full object-contain"
          width={1024}
          height={1024}
          src={`https://jbvalues.com/images/itemimages/${props.data.id}.webp`}
          alt={`an image of ${props.data.name}`}
        />
        <div className="flex flex-row justify-between">
          <p>Value</p>
          <p className="font-bold">$ {props.data.value.toLocaleString()}</p>
        </div>
      </div>
    </a>
  );
}

type Items = {
  id: string;
  name: string;
  value: number;
}[];

export default function ValueList() {
  const [items, setItems] = useState<Items>([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [order, setOrder] = useState("Descending");
  const [hideDupes, setHideDupes] = useState<
    "ShowBoth" | "ShowOnlyLegit" | "ShowOnlyDuped"
  >("ShowBoth");
  const [visibleItems, setVisibleItems] = useState<Items>([]);

  useEffect(() => {
    setVisibleItems(
      items.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) &&
          (category === "All categories" || item.id.startsWith(category)) &&
          (hideDupes === "ShowBoth" ||
            (hideDupes === "ShowOnlyLegit" && !isDuped(item.id)) ||
            (hideDupes === "ShowOnlyDuped" && isDuped(item.id)))
      )
    );
  }, [items, search, category, order, hideDupes]);

  useEffect(() => {
    getItemsAsArray().then((items) => {
      setItems(items);
    });
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center w-full h-16 mb-4 space-x-4">
        <Select defaultValue="All categories" onValueChange={setCategory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              <SelectItem key="all" value="All categories">
                All categories
              </SelectItem>
              {Object.entries(categories).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select defaultValue="Descending" onValueChange={setOrder}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sorting order</SelectLabel>
              <SelectItem key="value_desc" value="Descending">
                By value desc.
              </SelectItem>
              <SelectItem key="value_asc" value="Ascending">
                By value asc.
              </SelectItem>
              <SelectItem key="alphabetical" value="Alphabetical">
                By alphabet
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          defaultValue={hideDupes}
          onValueChange={(value) =>
            setHideDupes(
              value as "ShowBoth" | "ShowOnlyLegit" | "ShowOnlyDuped"
            )
          }
        >
          <SelectTrigger className="w-[260px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sorting order</SelectLabel>
              <SelectItem key="dupes_both" value="ShowBoth">
                Show legit & duped
              </SelectItem>
              <SelectItem key="dupes_legit" value="ShowOnlyLegit">
                Show only legit
              </SelectItem>
              <SelectItem key="dupes_dupes" value="ShowOnlyDuped">
                Show only duped
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input
          placeholder="Search"
          onInput={(e) => setSearch(e.currentTarget.value)}
        />
      </div>

      <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] justify-items-center">
        {visibleItems
          .sort((a, b) => {
            switch (order) {
              case "Descending":
                return b.value - a.value;
              case "Ascending":
                return a.value - b.value;
              case "Alphabetical":
                return a.name.localeCompare(b.name);
              default:
                return 0;
            }
          })
          .map((item) => (
            <Item
              key={item.id}
              data={{ id: item.id, name: item.name, value: item.value }}
            />
          ))}
      </div>
    </div>
  );
}
