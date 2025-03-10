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
import { cn, navigation } from "@/lib/utils";
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
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/">
            <Image
              className="w-12 h-12 object-contain"
              src={"/logo.webp"}
              width={256}
              height={256}
              alt="jbvalues logo"
            />
          </a>

          <div className="flex items-center justify-between w-full">
            <div>
              {/* Main site nav */}
              <NavigationMenu className="mx-4 space-x-2">
                <NavigationMenuList>
                  {navigation.mainNav.map((group) => (
                    <NavigationMenuItem key={group.title}>
                      <NavigationMenuTrigger className="!bg-transparent">
                        {group.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                          {group.items.map((item) => (
                            <ListItem
                              key={item.url}
                              href={item.url}
                              icon={<item.icon />}
                              title={item.title}
                            >
                              {item.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="flex">
              {/* Left nav (theme switcher, ctrl+k finder) */}
              {navigation.socials.map((social) => (
                <Button
                  key={social.url}
                  variant="ghost"
                  size="icon"
                  onClick={() => window.open(social.url, "_blank")}
                >
                  {<social.icon />}
                </Button>
              ))}
              <Separator className="mx-1" orientation="vertical" />
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
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, children, icon = null, ...props }, ref) => {
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
          {icon && <div className="mb-2">{icon}</div>}
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
