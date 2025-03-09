"use client";

import { Item } from "@/app/values/[slug]/page";
import { ChevronsUpDown } from "lucide-react";

import { getItemsAsArray, getCategoryFromId } from "@/lib/utils";
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
import { useEffect, useState } from "react";
import { ImageWithFallback } from "@/components/image-with-fallback";

function CalculatorEntry({
  item,
  onRemove,
}: {
  item: SelectedItem;
  onRemove: (itemId: string) => void;
}) {
  return (
    <div 
      key={item.id} 
      className="border-zinc-800 border rounded-lg aspect-square flex flex-col items-center p-2 relative cursor-pointer w-[calc(12.5%-0.75rem)] min-w-20" 
      onClick={() => onRemove(item.id)}
      title="Click to remove"
    >
      <ImageWithFallback
        alt={item.name}
        className="w-full h-5/6 object-contain pointer-events-none"
        width={256}
        height={256}
        src={`https://jbvalues.com/images/itemimages/${item.id}.webp`}
        fallbackSrc="/logo.webp"
      />
      <div className="absolute bottom-0 w-full text-center pointer-events-none bg-zinc-900/60">
        <p className="text-sm truncate">{item.name}</p>
        <p className="text-sm font-semibold">
          ${(item.value * item.quantity).toLocaleString()}
        </p>
      </div>
      <div className="absolute top-2 right-2 rounded-full px-2 py-1 pointer-events-none">
        <span className="text-sm font-bold">{item.quantity}</span>
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

function Calculator({
  title,
  selectedItems,
  setSelectedItems,
}: {
  title: string;
  selectedItems: SelectedItems;
  setSelectedItems: (selectedItems: SelectedItems) => void;
}) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([{} as Partial<Item>]);

  useEffect(() => {
    getItemsAsArray(false).then((items) => {
      setItems([...items].sort((a, b) => getCategoryFromId(b.id).localeCompare(getCategoryFromId(a.id))));
    });
  }, []);

  const removeItem = (itemId: string) => {
    setSelectedItems(
      selectedItems.map((selectedItem) => {
        if (selectedItem.id === itemId) {
          return {
            ...selectedItem,
            quantity: 0,
          };
        }
        return selectedItem;
      })
    );
  };

  return (
    <div className="p-4 md:outline outline-zinc-800 rounded-lg w-full">
      <h2 className="font-bold text-xl mb-4">{title}</h2>
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
                    onSelect={() => {
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
      
      <div className="flex flex-row flex-wrap gap-3 mt-4">
        {selectedItems
          .filter((item) => item.quantity > 0)
          .map((item) => (
            <CalculatorEntry
              key={item.id}
              item={item}
              onRemove={removeItem}
            />
          ))}
      </div>
      
      <div className="flex flex-row justify-between ml-1 pt-4">
        <p className="font-semibold pt-3">
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
  const [yourItems, setYourItems] = useState<SelectedItems>([]);
  const [theirItems, setTheirItems] = useState<SelectedItems>([]);
  
  const total1 = yourItems.reduce((acc, item) => acc + item.value * item.quantity, 0);
  const total2 = theirItems.reduce((acc, item) => acc + item.value * item.quantity, 0);
  
  const valueDifference = total2 - total1;
  
  return (
    <div>
      <h1 className="font-bold text-3xl text-center -mt-6 mb-6">Jailbreak Trading Calculator</h1>
      <div className="flex flex-col space-y-6 justify-center w-full">
        <Calculator 
          title="Your Offer" 
          selectedItems={yourItems} 
          setSelectedItems={setYourItems} 
        />
        <Calculator 
          title="Their Offer" 
          selectedItems={theirItems} 
          setSelectedItems={setTheirItems} 
        />
      </div>
      <div className="mt-8 text-center">
        <div className="inline-block dark:bg-black border border-zinc-800 px-4 py-2 rounded-lg">
          <p className="text-sm">
            Value Difference: <span className={`font-bold ${valueDifference > 0 ? 'text-green-500' : valueDifference < 0 ? 'text-red-500' : 'text-white'}`}>
              {valueDifference > 0 ? '+' : ''}{valueDifference.toLocaleString()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
