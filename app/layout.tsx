import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { QuoteProvider } from "./contexts/quote-context";
import { CommandPaletteProvider } from "./components/command-palette-context";
import { Toaster } from "@/components/ui/sonner";
import { TopBar } from "./components/top-bar/top-bar";

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
              <TopBar />
              {children}
            </QuoteProvider>
            <Toaster />
          </CommandPaletteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
