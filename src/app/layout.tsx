import type { Metadata } from "next";
import { Poppins, Kanit, Playfair_Display } from "next/font/google";

import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next"

// Configuração das fontes com variáveis CSS
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "700"], // Regular300, Regular400 e Bold
});

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["300", "400", "700"], // Regular300, Regular400 e Bold
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ['latin'],
  weight: ['400', '700'], // Regular400 e Bold
});

export const metadata: Metadata = {
  title: "SrGee - AI Assistant",
  description: "Your best friend and best hater of your coding skills. At least he's honest.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${kanit.variable} ${playfair.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}