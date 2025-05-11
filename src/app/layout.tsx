import type { Metadata } from "next";
import { Poppins, Kanit } from "next/font/google"; // Removido Playfair_Display
import "./globals.css";

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
        className={`${poppins.variable} ${kanit.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}