import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import "./globals.css";

//https://docs.fontawesome.com/web/use-with/react/use-with - large icon hydration errors
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import UIProvider from "@/comp/assets/UI";
import PlayerProvider from "@/comp/music/handler";
import Music from "@/comp/music/main";
import Wrapper from "@/comp/wrapper/main";
import Header from "@/comp/header/main";
import Footer from "@/comp/footer/main";

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
        className={`${Font.variable} custom-scroll bg-primary grid-background antialiased`}
      >
        <UIProvider>
          <PlayerProvider>
            <Music />

            <Wrapper>
              <Header />
              {children}
              <Footer />
            </Wrapper>
          </PlayerProvider>
        </UIProvider>
      </body>
    </html>
  );
}
