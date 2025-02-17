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
          <div className="relative flex min-h-svh flex-col dark:bg-zinc-950 bg-zinc-50 dark:text-zinc-200 text-zinc-950">
            <div className="flex flex-col justify-center items-center">
              <Navbar />
              <div className="container border-zinc-900 py-12">{children}</div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
