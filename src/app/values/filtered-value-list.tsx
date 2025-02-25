"use client";

import { ImageWithFallback } from "@/components/image-with-fallback";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CollapsibleContent } from "@/components/ui/collapsible";
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
import {
  categories,
  getCategoryFromId,
  getItemsAsArray,
  isDuped,
} from "@/lib/utils";
import { Collapsible } from "@radix-ui/react-collapsible";
import {
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  Clock,
  Globe,
  Car,
  Brush,
  Palette,
  Sparkles,
  CircleDot,
  Cuboid,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useMap } from "usehooks-ts";
import { Slider } from "@/components/ui/slider";

function Item(props: {
  data: {
    id: string;
    name: string;
    value: number;
    demand: string;
  };
}) {
  return (
    <a href={`/values/${props.data.id}`} className="cursor-pointer">
      <div className="w-full h-fit outline outline-zinc-800 rounded-lg p-4 transition duration-150 ease-in-out hover:scale-103 hover:shadow-lg">
        <div className="flex justify-between items-start">
          <span className="text-sm">{getCategoryFromId(props.data.id)}</span>
          <span className="text-xs text-zinc-500 flex items-center gap-1">
            <Clock size={11} />2 days ago
          </span>
        </div>

        <div className="flex flex-row justify-between items-center space-x-4">
          <h4 className="text-lg font-semibold">{props.data.name}</h4>
          {isDuped(props.data.id) && <Badge variant="destructive">Duped</Badge>}
        </div>

        <ImageWithFallback
          className="py-4 h-44 w-full object-contain"
          width={1024}
          height={1024}
          src={`https://jbvalues.com/images/itemimages/${props.data.id}.webp`}
          fallbackSrc="/logo.webp"
          alt={`an image of ${props.data.name}`}
        />

        <div className="flex flex-row justify-between">
          <p>Value</p>
          <p className="font-semibold">$ {props.data.value.toLocaleString()}</p>
        </div>

        <div className="flex flex-row justify-between">
          <p>Rarity</p>
          <p className="font-semibold">
            {
              ["Extremely Rare", "Rare", "Uncommon", "Common", "Very Common"][
                Math.floor(Math.random() * 5)
              ]
            }
          </p>
        </div>

        <div className="flex flex-row justify-between">
          <p>Demand</p>
          <p className="font-semibold">
            {
              [
                "Excellent",
                "High",
                "Above Average",
                "Average",
                "Low",
                "Minimal",
                "Nonexistent",
              ][Math.floor(Math.random() * 7)]
            }
          </p>
        </div>
      </div>
    </a>
  );
}

type Items = {
  id: string;
  name: string;
  value: number;
  demand: string;
}[];

export default function FilteredValueList(props: { items: Items }) {
  const isMobile = useIsMobile();

  const [items, setItems] = useState<Items>(props.items);
  const [visibleItems, setVisibleItems] = useState<React.JSX.Element[]>([]);
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [valueRange, setValueRange] = useState<[number, number]>([0, Infinity]);
  const [activeSection, setActiveSection] = useState("All");

  const [options, optionsActions] = useMap<string, boolean | string>([
    ["dupes", true],
    ["cleans", true],
    ["sortOrder", "desc"],
    ["sortBy", "category"],
    ...(Object.values(categories).map((category) => [category, true]) as [
      string,
      boolean
    ][]),
  ]);

  useEffect(() => {
    setItems(props.items);
  }, [props.items]);

  useEffect(() => {
    const highestValue = Math.max(...items.map((item) => item.value));
    setValueRange([0, highestValue]);
  }, [items]);

  useEffect(() => {
    let filteredItems = items.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) &&
        (options.get("dupes") || !isDuped(item.id)) &&
        (options.get("cleans") || isDuped(item.id)) &&
        options.get(getCategoryFromId(item.id)) &&
        item.value >= valueRange[0] &&
        item.value <= valueRange[1] &&
        (activeSection === "All" ||
          getCategoryFromId(item.id) === activeSection)
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
          data={{
            id: item.id,
            name: item.name,
            value: item.value,
            demand: item.demand,
          }}
        />
      ))
    );
  }, [items, options, search, valueRange, activeSection]);

  return (
    <div>
      <div className={`flex flex-row gap-2 justify-center mx-auto mb-4`}>
        <Button
          key="all"
          variant={activeSection === "All" ? "secondary" : "outline"}
          onClick={() => setActiveSection("All")}
          className="gap-2"
        >
          <Globe size={16} />
          {!isMobile && <span>All</span>}
        </Button>
        {Object.values(categories).map((category) => {
          const icon = {
            Vehicle: <Car size={16} />,
            Spoiler: <Cuboid size={16} />,
            Rim: <CircleDot size={16} />,
            Texture: <Brush size={16} />,
            Color: <Palette size={16} />,
            Hyperchrome: <Sparkles size={16} />,
          }[category];

          return (
            <Button
              key={category}
              variant={activeSection === category ? "secondary" : "outline"}
              onClick={() => setActiveSection(category)}
              className="gap-2"
            >
              {icon}
              {!isMobile && (
                <span>
                  {category === "Hyperchrome" ? "Hypers" : `${category}s`}
                </span>
              )}
            </Button>
          );
        })}
      </div>

      <div
        className={`flex flex-row items-center space-x-2 justify-center ${
          isMobile ? "w-full" : "w-2/3"
        } mx-auto`}
      >
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
          <SelectTrigger className="w-full lg:w-32 gap-1">
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
            className="border-zinc-800 max-w-125"
            placeholder="Search"
            onInput={(e) => setSearch(e.currentTarget.value)}
          />
        )}
      </div>

      <Collapsible open={filterOpen}>
        <CollapsibleContent>
          <div className="my-2 flex flex-col lg:flex-row border border-zinc-800 rounded-lg p-3 w-full lg:w-max mx-auto min-h-[7rem] lg:h-28">
            <div className="grid grid-cols-2 gap-2 mb-4 lg:mb-0">
              {Object.values(categories).map((category) => (
                <div className="flex items-center space-x-2" key={category}>
                  <Checkbox
                    defaultChecked={options.get(category) as boolean}
                    onCheckedChange={(checked) =>
                      optionsActions.set(category, checked as boolean)
                    }
                    id={category}
                    className="!bg-transparent !text-white"
                  />
                  <Label htmlFor={category}>{category}</Label>
                </div>
              ))}
            </div>

            <Separator
              className="hidden lg:block mx-4"
              orientation="vertical"
            />

            <div className="grid grid-cols-2 gap-2 mb-4 lg:mb-0 lg:grid-cols-1">
              {["dupes", "cleans"].map((option) => (
                <div className="flex items-center space-x-2" key={option}>
                  <Checkbox
                    defaultChecked={options.get(option) as boolean}
                    onCheckedChange={(checked) =>
                      optionsActions.set(option, checked as boolean)
                    }
                    id={option}
                    className="!bg-transparent !text-white"
                  />
                  <Label htmlFor={option}>Show {option}</Label>
                </div>
              ))}
            </div>

            <Separator
              className="hidden lg:block mx-4"
              orientation="vertical"
            />
            <Separator className="lg:hidden my-4" />

            <div className="flex flex-col justify-center w-full lg:w-64 gap-2">
              <div>
                <Label className="mb-2 block">
                  Min Value{" "}
                  <span className="mt-1 text-sm text-zinc-500">
                    (${valueRange[0].toLocaleString()})
                  </span>
                </Label>
                <Slider
                  min={0}
                  max={Math.max(...items.map((item) => item.value)) * 0.7}
                  step={100000}
                  value={[valueRange[0]]}
                  onValueChange={(value) =>
                    setValueRange([value[0], valueRange[1]])
                  }
                />
              </div>

              <div>
                <Label className="mb-2 block">
                  Max Value{" "}
                  <span className="mt-1 text-sm text-zinc-500">
                    (${valueRange[1].toLocaleString()})
                  </span>
                </Label>
                <Slider
                  min={0}
                  max={Math.max(...items.map((item) => item.value))}
                  step={100000}
                  value={[valueRange[1]]}
                  onValueChange={(value) =>
                    setValueRange([valueRange[0], value[0]])
                  }
                />
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {isMobile && (
        <Input
          className="border-zinc-800 mt-8"
          placeholder="Search"
          onInput={(e) => setSearch(e.currentTarget.value)}
        />
      )}

      <div className="w-full max-w-[2000px] mx-auto mt-8 grid gap-8 grid-cols-[repeat(auto-fill,minmax(18rem,1fr))]">
        {visibleItems}
      </div>
    </div>
  );
}
