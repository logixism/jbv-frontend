"use client";

import { ImageWithFallback } from "@/components/image-with-fallback";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { categories, getCategoryFromId, getItemsAsArray } from "@/lib/utils";
import { Collapsible } from "@radix-ui/react-collapsible";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { useMap } from "usehooks-ts";

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
      <div className="w-full h-fit outline outline-zinc-800 rounded-lg p-4 transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
        <span className="text-sm">{getCategoryFromId(props.data.id)}</span>
        <div className="flex flex-row items-center space-x-4">
          <h4 className="text-lg font-semibold">{props.data.name}</h4>
          {isDuped(props.data.id) && <Badge variant="destructive">Duped</Badge>}
        </div>

        <ImageWithFallback
          className="py-4 h-48 w-full object-contain"
          width={1024}
          height={1024}
          src={`https://jbvalues.com/images/itemimages/${props.data.id}.webp`}
          fallbackSrc="/logo.png"
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
  const isMobile = useIsMobile();

  const [items, setItems] = useState<Items>([]);
  const [visibleItems, setVisibleItems] = useState<React.JSX.Element[]>([]);
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const [options, optionsActions] = useMap<string, boolean | string>([
    ["dupes", true],
    ["cleans", true],
    ["sortOrder", "desc"],
    ["sortBy", "value"],
    ...(Object.values(categories).map((category) => [category, true]) as [
      string,
      boolean
    ][]),
  ]);

  useEffect(() => {
    let filteredItems = items.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) &&
        (options.get("dupes") || !isDuped(item.id)) &&
        (options.get("cleans") || isDuped(item.id)) &&
        options.get(getCategoryFromId(item.id))
    );

    if (options.get("sortBy") === "category") {
      filteredItems = filteredItems.sort((a, b) => {
        return a.value - b.value;
      });
    }

    let sortedItems = filteredItems.sort((a, b) => {
      switch (options.get("sortBy")) {
        case "value":
          return a.value - b.value;
        case "name":
          return a.name.localeCompare(b.name);
        case "category":
          return getCategoryFromId(a.id).localeCompare(getCategoryFromId(b.id));
        default:
          return 0;
      }
    });

    if (options.get("sortOrder") === "desc") {
      sortedItems = sortedItems.reverse();
    }

    setVisibleItems(
      sortedItems.map((item) => (
        <Item
          key={item.id}
          data={{ id: item.id, name: item.name, value: item.value }}
        />
      ))
    );
  }, [items, options, search]);

  useEffect(() => {
    getItemsAsArray().then((items) => {
      setItems(items);
    });
  }, []);

  return (
    <div>
      <div className="flex flex-row items-center w-full space-x-2">
        <Button variant="outline" onClick={() => setFilterOpen(!filterOpen)}>
          <ChevronsUpDown className="h-4 w-4" />
          Filters
        </Button>

        <Select
          defaultValue={options.get("sortBy") as string}
          onValueChange={(value) => {
            optionsActions.set("sortBy", value);
          }}
        >
          <SelectTrigger className="w-full lg:w-32">
            <SelectValue />
          </SelectTrigger>
          <Button
            variant="outline"
            className="w-9"
            onClick={() => {
              optionsActions.set(
                "sortOrder",
                options.get("sortOrder") === "asc" ? "desc" : "asc"
              );
            }}
          >
            {options.get("sortOrder") === "asc" ? <ArrowUp /> : <ArrowDown />}
          </Button>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by</SelectLabel>
              <SelectItem value="category">Category</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="value">Value</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {!isMobile && (
          <Input
            placeholder="Search"
            onInput={(e) => setSearch(e.currentTarget.value)}
          />
        )}
      </div>

      <Collapsible className="my-2" open={filterOpen}>
        <CollapsibleContent>
          <div className="flex flex-row border border-zinc-800 rounded-lg p-3 w-full h-24 lg:flex-row **:!text-xs md:**:!text-sm">
            <div className="grid grid-cols-2 w-fit">
              {Object.values(categories).map((category) => (
                <div
                  className="flex w-fit flex-row items-center space-x-2"
                  key={category}
                >
                  <Checkbox
                    defaultChecked={options.get(category) as boolean}
                    onCheckedChange={(checked) =>
                      optionsActions.set(category, checked as boolean)
                    }
                    id={category}
                  />
                  <Label htmlFor={category}>{category}</Label>
                </div>
              ))}
            </div>
            <Separator className="mx-4" orientation="vertical" />
            <div className="grid grid-cols-1 w-fit">
              {["dupes", "cleans"].map((option) => (
                <div
                  className="flex flex-row items-center space-x-2"
                  key={option}
                >
                  <Checkbox
                    defaultChecked={options.get(option) as boolean}
                    onCheckedChange={(checked) =>
                      optionsActions.set(option, checked as boolean)
                    }
                    id={option}
                  />
                  <Label htmlFor={option}>Show {option}</Label>
                </div>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {isMobile && (
        <Input
          placeholder="Search"
          onInput={(e) => setSearch(e.currentTarget.value)}
        />
      )}

      <div className="w-full mt-4 grid gap-8 grid-cols-[repeat(auto-fit,minmax(18rem,1fr))]">
        {visibleItems}
      </div>
    </div>
  );
}
