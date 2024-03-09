import type { Metadata } from "next";
import { Providers } from "./providers";
import ParticlesComp from "@/components/Particles";
import "./globals.css";
import { Suspense } from "react";
import NavbarContactControl from "@/components/NavbarContactControl";

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
          <NavbarContactControl />
          <Suspense>
            <ParticlesComp />
          </Suspense>
          {children}
        </Providers>
      </body>
    </html>
  );
}
