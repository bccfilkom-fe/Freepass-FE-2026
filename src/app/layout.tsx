import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import AppLayout from "../shared/components/layout/AppLayout";
import { Inter, Geist_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Finexa — Finance Tracker",
  description: "Track, analyze, and optimize your finances.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`
          ${inter.variable} 
          ${geistMono.variable}
          font-sans
          bg-[#0B0F1A]
          text-gray-200
          antialiased
        `}
      >
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  );
}
