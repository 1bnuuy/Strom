import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import "./globals.css";

import Wrapper from "@/comp/wrapper/main";
import Header from "@/comp/header/main";
import Footer from "@/comp/footer/main";
import Music from "@/comp/music/main";
import UIProvider from "@/comp/assets/UI";

const Font = Inconsolata({
  variable: "--CustomFont",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "XONAR",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Font.variable} bg-primary grid-background antialiased`}
      >
        <Wrapper>
          <UIProvider>
            <Header />
            {children}
            <Music />
            <Footer />
          </UIProvider>
        </Wrapper>
      </body>
    </html>
  );
}
