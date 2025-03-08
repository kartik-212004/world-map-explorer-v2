import SessionWrapper from "./SessionWrapper";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

import { MapProvider } from "./context/MapContext";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "World Map Explorer",
  description: "Explore the world map with interactive features",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper>
          <MapProvider>
            <main className=" ">{children}</main>
          </MapProvider>
          <Toaster richColors position="top-right" />
        </SessionWrapper>
      </body>
    </html>
  );
}
