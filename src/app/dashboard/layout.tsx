"use client";

import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarContent,
  SidebarGroup,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import {
  BarChart,
  ChartArea,
  DoorOpen,
  Edit,
  Edit3,
  HelpCircle,
  Home,
  LogOut,
  Settings,
  Settings2,
  SettingsIcon,
  User,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/image-with-fallback";
import SettingsDialog from "@/components/settings-dialog";
import { Montserrat } from "next/font/google";

const navigation = [
  {
    title: "User",
    items: [
      {
        title: "Info",
        href: "/dashboard/info",
        icon: User,
      },
      {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings2,
      },
      {
        title: "Support",
        href: "/dashboard/support",
        icon: HelpCircle,
      },
      {
        title: "Log out",
        href: "/logout",
        icon: LogOut,
      },
    ],
  },
  {
    title: "Value Team",
    items: [
      {
        title: "Analytics",
        href: "/dashboard/valueteam/analytics",
        icon: BarChart,
      },
      {
        title: "Editor",
        href: "/dashboard/valueteam/editor",
        icon: Edit,
      },
      {
        title: "Settings",
        href: "/dashboard/valueteam/settings",
        icon: SettingsIcon,
      },
    ],
  },
  {
    title: "Reviewers",
    items: [
      {
        title: "Analytics",
        href: "/dashboard/reviewers/analytics",
        icon: BarChart,
      },
      {
        title: "Submissions",
        href: "/dashboard/reviewers/submissions",
        icon: Edit,
      },
    ],
  },
  {
    title: "Experts",
    items: [
      {
        title: "Applications",
        href: "/dashboard/experts/applications",
        icon: Edit3,
      },
    ],
  },
];

export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-zinc-950 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-950">
      <SidebarProvider>
        <Sidebar variant="inset">
          <SidebarContent>
            {navigation.map((navGroup, index) => (
              <SidebarGroup key={index}>
                <SidebarGroupLabel>{navGroup.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {navGroup.items.map((item, itemIndex) => (
                      <SidebarMenuItem key={itemIndex}>
                        <SidebarMenuButton asChild>
                          <Link href={item.href}>
                            {<item.icon />}
                            {item.title}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
          <SidebarFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Return to JBValues
            </Button>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="min-h-screen min-w-screen md:min-w-0 p-8">
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
