import {
  Calculator,
  Calendar,
  ChevronRight,
  CogIcon,
  Copy,
  Globe,
  HelpCircle,
  HelpCircleIcon,
  Home,
  Inbox,
  Lock,
  Moon,
  Repeat,
  Search,
  Settings,
  Sun,
  Users,
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
      title: "Main",
      items: [
        {
          icon: Home,
          title: "Home",
          url: "/",
        },
        {
          icon: HelpCircle,
          title: "FAQ",
          url: "/faq",
        },
      ],
    },
    {
      title: "Values",
      items: [
        {
          icon: Globe,
          title: "List",
          url: "/values",
        },
        {
          icon: Calculator,
          title: "Calculator",
          url: "/tools/calculator",
        },
        {
          icon: Users,
          title: "Team",
          url: "/values/team",
        },
        {
          icon: Repeat,
          title: "Recent Changes",
          url: "/values/changes",
        },
      ],
    },
    {
      title: "Other",
      items: [
        {
          icon: Lock,
          title: "Private Servers",
          url: "/other/private_servers",
        },
        {
          icon: Copy,
          title: "Dupe List",
          url: "/other/dupe_list",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { setTheme } = useTheme();

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/" className="w-full justify-center items-center">
              {/* we can put the long-form logo here, i've asked popman for it & he said after revamp's done */}
              <Image
                src="/logo.png"
                width={2048}
                height={2048}
                alt="logo"
                className="h-24 object-contain"
              />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="flex items-center justify-center space-y-8">
        {data.navMain.map((item) => (
          <div key={item.title} className="w-full text-center">
            <h2 className="font-bold text-xl">{item.title}</h2>
            <ul className="w-full space-y-2 mt-2 flex flex-col justify-center items-center">
              {item.items.map((item) => (
                <li key={item.title}>
                  <Button
                    variant={"outline"}
                    className="justify-between"
                    asChild
                  >
                    <Link className="w-48 rounded-lg pr-2" href={item.url}>
                      {item.title}
                      {item.icon && <item.icon className="mr-2" />}
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
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
    </Sidebar>
  );
}
