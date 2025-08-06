import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { GameProvider } from "@/contexts/GameContext";
import { WalletProvider } from "@/providers/WalletProvider";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GameChain - Blockchain Gaming Platform",
  description: "Play games together online at events on the blockchain",
  keywords: ["blockchain", "gaming", "events", "multiplayer", "web3"],
  authors: [{ name: "GameChain Team" }],
  creator: "GameChain",
  publisher: "GameChain",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <GameProvider>
            <WalletProvider>
              <AnimatedBackground />
              {children}
            </WalletProvider>
          </GameProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
