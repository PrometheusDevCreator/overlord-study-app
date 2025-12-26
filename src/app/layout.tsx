import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ProgressProvider } from "@/lib/progress-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Overlord: Gerry's Study Room - D-Day & Normandy Campaign",
  description: "An interactive study app exploring D-Day and the Normandy Campaign through structured modules, timelines, maps, flashcards, and quizzes.",
  keywords: ["D-Day", "Normandy", "World War II", "History", "Education", "Operation Overlord"],
  authors: [{ name: "Built for Gerry" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ProgressProvider>
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ProgressProvider>
      </body>
    </html>
  );
}
