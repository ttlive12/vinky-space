import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import ParticlesComp from "@/components/Particles";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vinky",
  description: "vinky-space",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ParticlesComp />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}