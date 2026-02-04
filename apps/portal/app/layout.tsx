import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { ThemeProvider } from "@/pages/components/theme-provider";
import { QuoteProvider } from "@/app/quote-context";
import { CommandPaletteProvider } from "@/pages/components/command-palette-context";
import { Toaster } from "@novo/ui";
import { TopBar } from "@/pages/components/top-bar/top-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Design System Demo",
  description: "A modern design system demo showcasing Next.js, React, Tailwind CSS, and Radix UI components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <CommandPaletteProvider>
            <QuoteProvider>
              <Suspense fallback={<div className="h-14" />}>
                <TopBar />
              </Suspense>
              {children}
            </QuoteProvider>
            <Toaster />
          </CommandPaletteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
