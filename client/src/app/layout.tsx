import QueryProvider from "@/components/providers/QueryProvider";
import ThemesProvider from "@/components/providers/ThemesProvider";
import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Barlow_Semi_Condensed, Michroma } from "next/font/google";
import { Toaster } from "sonner";
import AuthProvider from "../components/providers/AuthProvider";
import ProgressProvider from "../components/providers/ProgressProvider";
import "./globals.css";

const barlow = Barlow_Semi_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

const michroma = Michroma({
  variable: "--font-michroma",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: {
    default: "Toeankoe",
    template: "%s | Toeankoe"
  },
  description: "Toeankoe Barbershop is a platform for hassle-free barber bookings. Discover services, check stylists, and manage appointments all in one place.",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${barlow.variable} ${michroma.variable} text-base lg:text-xl antialiased`}
      >
        <ViewTransitions>
          <ThemesProvider>
            <ProgressProvider>
              <QueryProvider>
                <AuthProvider>
                  <Toaster position="top-center"/>
                  {children}
                  {modal}
                </AuthProvider>
              </QueryProvider>
            </ProgressProvider>
          </ThemesProvider>
        </ViewTransitions>
      </body>
    </html>
  );
}
