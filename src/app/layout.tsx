import type { Metadata } from "next";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import ParticlesComp from "@/components/Particles";
import "./globals.css";

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
    <html lang="en" className="dark">
      <body>
        <Providers>
          <ParticlesComp />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
