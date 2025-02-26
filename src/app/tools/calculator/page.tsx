"use client";

import { Item } from "@/app/values/[slug]/page";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn, getItemsAsArray } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ImageWithFallback } from "@/components/image-with-fallback";

function CalculatorEntry({
  item,
  selectedItems,
  setSelectedItems,
}: {
  item: SelectedItem;
  selectedItems: SelectedItems;
  setSelectedItems: (selectedItems: SelectedItems) => void;
}) {
  return (
    <div
      key={item.id}
      className="p-2 flex flex-row border border-zinc-800 h-20 rounded-lg overflow-clip"
    >
      <ImageWithFallback
        alt="should be an image here (ryan's fault)"
        className="max-w-40 h-full object-contain"
        width={1024}
        height={1024}
        src={`https://jbvalues.com/images/itemimages/${item.id}.webp`}
        fallbackSrc="/logo.webp"
      />
      <Separator orientation="vertical" className="mx-1" />
      <div className="flex flex-row items-center ml-2 w-full">
        <div className="flex flex-col justify-between w-full">
          <h3 className="text-sm md:text-lg">{item.name}</h3>
          <p className="font-semibold">
            $ {(item.value * item.quantity).toLocaleString()}
          </p>
        </div>
        <div className="h-full">
          <Input
            type="number"
            step={1}
            min={0}
            max={10000}
            value={item.quantity || 0}
            className="w-18 md:w-28 h-full !text-2xl text-center font-medium"
            onChange={(e) => {
              if (e.target.value === "") {
                setSelectedItems(
                  selectedItems.map((selectedItem) => {
                    if (selectedItem.id === item.id) {
                      selectedItem.quantity = 0;
                    }
                    return selectedItem;
                  })
                );
                return;
              }

              if (isNaN(parseInt(e.target.value))) {
                return;
              }

              if (parseInt(e.target.value) > 10000) {
                return;
              }

              setSelectedItems(
                selectedItems.map((selectedItem) => {
                  if (selectedItem.id === item.id) {
                    selectedItem.quantity = parseInt(e.target.value);
                  }
                  return selectedItem;
                })
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}

type SelectedItem = {
  id: string;
  name: string;
  value: number;
  quantity: number;
};

type SelectedItems = SelectedItem[];

function Calculator() {
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<SelectedItems>([]);
  const [items, setItems] = useState([{} as Partial<Item>]);

  useEffect(() => {
    getItemsAsArray(false).then((items) => {
      setItems(items);
    });
  }, []);

  return (
    <div className="p-4 md:outline outline-zinc-800 rounded-lg w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            Select item to add
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command className="w-full">
            <CommandInput className="w-full" placeholder="Search item" />
            <CommandList className="w-full">
              <CommandEmpty>No item found</CommandEmpty>
              <CommandGroup className="w-full">
                {items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.name}
                    onSelect={(currentValue) => {
                      if (!item.id) return;

                      if (
                        selectedItems.findIndex(
                          (selectedItem) => selectedItem.id === item.id
                        ) !== -1
                      ) {
                        setSelectedItems(
                          selectedItems.map((selectedItem) => {
                            if (selectedItem.id === item.id) {
                              return {
                                ...selectedItem,
                                quantity: selectedItem.quantity + 1,
                              };
                            }
                            return selectedItem;
                          })
                        );

                        setOpen(false);
                        return;
                      }

                      setSelectedItems([
                        ...selectedItems,
                        {
                          id: item.id,
                          name: item.name!,
                          value: item.value!,
                          quantity: 1,
                        },
                      ]);

                      setOpen(false);
                    }}
                  >
                    <ImageWithFallback
                      alt="img"
                      className="max-w-8 max-h-8 object-contain"
                      width={256}
                      height={256}
                      fallbackSrc="/logo.webp"
                      src={`https://jbvalues.com/images/itemimages/${item.id}.webp`}
                    />
                    {item.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="space-y-4 mt-4 max-h-160 overflow-y-scroll">
        {selectedItems
          .filter((item) => item.quantity > 0)
          .map((item) => (
            <CalculatorEntry
              key={item.id}
              item={item}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          ))}
      </div>
      <div className="flex flex-row justify-between ml-1 mt-4">
        <p className="font-semibold">
          Total: $
          {selectedItems
            .reduce((acc, item) => acc + item.value * item.quantity, 0)
            .toLocaleString()}
        </p>
        <Button
          disabled={
            selectedItems.length === 0 ||
            selectedItems.every((item) => item.quantity === 0)
          }
          onClick={() => {
            setSelectedItems([]);
          }}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div>
      <h1 className="font-bold text-3xl text-center -mt-6 mb-6">Jailbreak Trading Calculator</h1>
      <div className="flex space-x-8 justify-center w-full">
        <Calculator />
        <Calculator />
      </div>
    </div>
  );
}
