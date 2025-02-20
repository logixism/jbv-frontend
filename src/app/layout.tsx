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
import { useIsMobile } from "@/hooks/use-mobile";
import BGParticles from "@/components/bg-particles";
import { useTheme } from "next-themes";

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
  const [isDash, setIsDash] = useState(false);

  const isMobile = useIsMobile();

  useEffect(() => {
    setIsClient(true);
    setIsDash(window.location.href.includes("/dash"));
  }, []);

  useEffect(() => {
    document.documentElement.style.fontFamily = preferredFont;
  }, [preferredFont]);

  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        {isClient && (
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {/* <BGParticles /> */}

            {(preferredNavMethod === "sidebar" || isMobile) && !isDash ? (
              <SidebarProvider>
                <AppSidebar />
                {isMobile && <SidebarTrigger className="absolute z-50 m-1" />}
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
      </body>
    </html>
  );
}
