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
  SidebarTrigger,
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
import { navigation } from "@/lib/utils";
import { ImageWithFallback } from "./image-with-fallback";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { setTheme } = useTheme();

  return (
    <Sidebar className="h-min max-h-screen my-auto overflow-y-scroll pt-0 pb-0" variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/" className="w-full justify-center items-center m-2">
              {/* we can put the long-form logo here, i've asked popman for it & he said after revamp's done */}
              <Image
                src="/logo.webp"
                width={2048}
                height={2048}
                alt="logo"
                className="h-13 object-contain"
              />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="flex items-center justify-center space-y-6 flex-none shrink">
        {navigation.mainNav.map((item) => (
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
                    <Link className="w-46 rounded-lg pr-2" href={item.url}>
                      {item.title}
                      {item.icon && <item.icon className="mr-2" />}
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="w-full text-center">
          <h2 className="font-bold text-xl">Socials</h2>
          <ul className="w-full mt-2 flex justify-center items-center gap-2">
            {navigation.socials.map((social) => (
              <li key={social.url}>
                <Button className="min-w-10" variant={"outline"} size={"icon"} asChild>
                  <Link href={social.url}>{<social.icon />}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </SidebarContent>
      <SidebarFooter className="mt-4 mb-4">
        <div className="flex justify-between flex-row w-46 mx-auto">
          <Button
            onClick={() => {
              window.location.href = "/dashboard/info";
            }}
            variant={"outline"}
            className="flex flex-row p-0 flex-1 overflow-hidden"
          >
            <ImageWithFallback
              src="/seal.png"
              fallbackSrc="/fallback.png"
              className="h-full w-fit object-contain self-start"
              width={256}
              height={256}
            />
            <div className="flex-1 text-center pr-2">Dashboard</div>
          </Button>
          <SettingsDialog
            trigger={
              <Button size={"icon"} variant={"outline"} className="ml-2 w-9">
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
