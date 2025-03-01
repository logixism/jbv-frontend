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
import { RightSidebar } from "@/components/right-sidebar";
import { AuthProvider } from "@/lib/auth";

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
  const [sidebarFits, setSidebarFits] = useState(false);

  const isMobile = useIsMobile();

  useEffect(() => {
    setIsClient(true);
    setIsDash(window.location.href.includes("/dash"));
    setSidebarFits(window.innerHeight > 750);
  }, []);

  useEffect(() => {
    document.documentElement.style.fontFamily = preferredFont;
  }, [preferredFont]);

  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        {isClient && (
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AuthProvider>
              {/* <BGParticles /> */}

              {(preferredNavMethod === "sidebar" || isMobile) && !isDash && sidebarFits ? (
                <SidebarProvider>
                  <AppSidebar />
                  {isMobile && <SidebarTrigger className="absolute z-50 m-1" />}
                  <SidebarInset className="min-h-screen min-w-screen md:min-w-0 p-8 flex flex-row">
                    <div className="flex-1 min-w-0">
                      {children}
                    </div>
                    <RightSidebar />
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
            </AuthProvider>
          </ThemeProvider>
        )}
      </body>
    </html>
  );
}
