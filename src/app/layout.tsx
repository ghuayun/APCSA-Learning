import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/Sidebar";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "APCSA Study Hub",
  description: "Master AP Computer Science A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <TooltipProvider>
          <Sidebar />
          <main className="min-h-screen pl-0 lg:pl-[280px]">
            <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 pt-16 lg:pt-6">
              {children}
            </div>
          </main>
        </TooltipProvider>
      </body>
    </html>
  );
}
