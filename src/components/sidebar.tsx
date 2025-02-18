import {
  Calendar,
  ChevronRight,
  CogIcon,
  Home,
  Inbox,
  Moon,
  Search,
  Settings,
  Sun,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import SettingsDialog from "./settings-dialog";

const data = {
  navMain: [
    {
      title: "Values",
      items: [
        {
          title: "Value list",
          url: "/values",
        },
        {
          title: "Value calculator",
          url: "/tools/calculator",
        },
        {
          title: "Value team",
          url: "/values/team",
        },
        {
          title: "Recent changes",
          url: "/values/changes",
        },
      ],
    },
    {
      title: "Other",
      items: [
        {
          title: "Private Servers",
          url: "/other/private_servers",
        },
        {
          title: "Dupe list",
          url: "/other/dupe_list",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { setTheme } = useTheme();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/">
              {/* we can put the long-form logo here, i've asked popman for it & he said after revamp's done */}
              <Image
                src="/logo.png"
                width={512}
                height={512}
                alt="logo"
                className="object-contain w-8 h-8 ml-2"
              />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger>
                  {item.title}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <div className="flex justify-between w-full">
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => {
              setTheme(
                document.documentElement.classList.contains("dark")
                  ? "light"
                  : "dark"
              );
            }}
          >
            <Sun className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.5rem] w-[1.5rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
      </SidebarFooter>
      <SidebarRail className="border-r border-zinc-800" />
    </Sidebar>
  );
}
