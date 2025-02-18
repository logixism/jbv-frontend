"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { Montserrat } from "next/font/google";
import { Navbar } from "@/components/navbar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import "./globals.css";
import { AppSidebar } from "@/components/sidebar";
import { useLocalStorage } from "usehooks-ts";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [selectedNavMethod, __, _] = useLocalStorage(
    "selectedNavMethod",
    "sidebar"
  );

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="en">
      <body className={`$${montserrat.variable} antialiased`}>
        {isClient && (
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {selectedNavMethod === "sidebar" ? (
              <SidebarProvider>
                <AppSidebar />
                <SidebarInset className="min-h-screen min-w-screen md:min-w-0 p-8 text-zinc-950 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-950">
                  <div>{children}</div>
                </SidebarInset>
              </SidebarProvider>
            ) : (
              <div className="min-h-screen text-zinc-950 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-950">
                <Navbar />
                <div className="min-w-screen md:min-w-0 p-8">{children}</div>
              </div>
            )}
          </ThemeProvider>
        )}
      </body>
    </html>
  );
}
