import type { Metadata } from "next";
import { Afacad } from "next/font/google";
import "./globals.css";

import Wrapper from "@/comp/wrapper/wrapper";
import Transition from "@/comp/transition/transition";
import Header from "@/comp/header/main";

const Font = Afacad({
  variable: "--CustomFont",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Strøm",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Font.variable} antialiased`}>
        <Wrapper>
          <Transition>
            <Header />
            {children}
          </Transition>
        </Wrapper>
      </body>
    </html>
  );
}
