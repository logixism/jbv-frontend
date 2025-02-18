"use client";

import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "./ui/navigation-menu";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useTheme } from "next-themes";
import { Separator } from "./ui/separator";
import SettingsDialog from "./settings-dialog";
import { Settings } from "lucide-react";

export function Navbar() {
  const { setTheme } = useTheme();

  return (
    <header suppressHydrationWarning className="sticky top-0 z-50 w-full">
      <div className="flex items-center justify-center dark:bg-zinc-950/60 bg-zinc-50/60 backdrop-blur-lg">
        <div className="flex w-full justify-between px-8 h-12">
          <Link href="/">
            <Image
              className="w-12 h-12"
              src={"/logo.png"}
              width={256}
              height={256}
              alt="jbvalues logo"
            />
          </Link>

          <div className="flex items-center justify-between w-full">
            <div>
              {/* Main site nav */}
              <NavigationMenu className="mx-4 space-x-2">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="!bg-transparent">
                      Values
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <ListItem href="/values" title="Value list">
                          The home for our values
                        </ListItem>
                        <ListItem href="/values/team" title="Value team">
                          Our amazing team behind JBValues and their own lists
                        </ListItem>
                        <ListItem href="/values/recent" title="Recent changes">
                          Recently changed values
                        </ListItem>
                        <ListItem href="/tools/calculator" title="Calculator">
                          Calculate your inventory value easily
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="!bg-transparent">
                      Other
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <ListItem href="/tools/calc" title="Dupe list">
                          A list to check if your items are duped
                        </ListItem>
                        <ListItem href="/tools/recent" title="VIP Servers">
                          JBV-sponsored VIP servers
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="flex">
              {/* Left nav (theme switcher, ctrl+k finder) */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  window.open("https://x.com/jailbreakvalues", "_blank")
                }
              >
                <FaTwitter />
              </Button>
              <Button
                onClick={() =>
                  window.open("https://discord.gg/jbvalues", "_blank")
                }
                variant="ghost"
                size="icon"
              >
                <FaDiscord />
              </Button>
              <Separator className="mx-1" orientation="vertical" />
              <Button
                onClick={() =>
                  setTheme((theme) => (theme === "dark" ? "light" : "dark"))
                }
                variant="ghost"
                size="icon"
              >
                <MdLightMode className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MdDarkMode className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              <SettingsDialog
                trigger={
                  <Button variant={"ghost"} size={"icon"}>
                    <div className="flex items-center justify-center transition duration-1000 hover:rotate-360 w-full h-full">
                      <Settings />
                    </div>
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
