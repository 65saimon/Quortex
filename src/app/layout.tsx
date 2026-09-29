import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quantrix Intelligence | SaaS Engineering, Autonomous AI & Frontier R&D",
  description:
    "Quantrix Intelligence develops mission-critical SaaS architectures, autonomous agent swarms, and frontier algorithmic R&D for forward-leaning enterprises.",
  keywords: [
    "Quantrix Intelligence",
    "Enterprise SaaS",
    "Autonomous Systems",
    "AI Automation",
    "Deep Tech R&D",
    "Quantum Cryptography",
    "Agentic AI",
  ],
  authors: [{ name: "Quantrix Intelligence Engineering Group" }],
  openGraph: {
    title: "Quantrix Intelligence | Enterprise SaaS, Automation & R&D",
    description:
      "Mission-critical engineering, autonomous AI systems, and frontier applied deep tech.",
    type: "website",
    locale: "en_US",
    siteName: "Quantrix Intelligence",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quantrix Intelligence",
    description: "Mission-critical engineering, autonomous AI systems, and frontier applied deep tech.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#f8fafc] text-slate-900 dark:bg-[#030712] dark:text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-700 dark:selection:text-cyan-200 transition-colors duration-300">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
