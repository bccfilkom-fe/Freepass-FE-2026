import type { Metadata } from "next";
import { Figtree, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { QueryProvider } from "../lib/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const def = Figtree({
  variable: "--font-def",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "nexstore",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${def.className} antialiased`}
      >
        {/* <QueryProvider> */}
          {children}
        {/* </QueryProvider> */}
      </body>
    </html>
  );
}
