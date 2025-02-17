"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { Montserrat } from "next/font/google";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`$${montserrat.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative flex min-h-svh flex-col dark:bg-zinc-950 dark:text-zinc-200">
            <div className="flex flex-1 flex-col">
              <Navbar />
              <div className="p-16">{children}</div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
