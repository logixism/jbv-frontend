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
import { AppSidebar } from "@/components/app-sidebar";
import { useLocalStorage } from "usehooks-ts";
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
  const [preferredFont, _setPreferredFont, _removePreferredFont] =
    useLocalStorage("preferredFont", "Montserrat");

  const [
    preferredNavMethod,
    _setPreferredNavMethod,
    _removePreferredNavMethod,
  ] = useLocalStorage("preferredNavMethod", "sidebar");

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    document.documentElement.style.fontFamily = preferredFont;
  }, [preferredFont]);

  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <div className="text-zinc-950 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-950">
          {isClient && (
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {preferredNavMethod === "sidebar" ? (
                <SidebarProvider>
                  <AppSidebar />
                  <SidebarInset className="min-h-screen min-w-screen md:min-w-0 p-8">
                    {children}
                  </SidebarInset>
                </SidebarProvider>
              ) : (
                <div className="min-h-screen">
                  <Navbar />
                  <div className="flex flex-col h-full min-w-screen md:min-w-0 p-8">
                    {children}
                  </div>
                </div>
              )}
            </ThemeProvider>
          )}
        </div>
      </body>
    </html>
  );
}
