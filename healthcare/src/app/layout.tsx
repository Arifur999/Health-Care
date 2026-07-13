import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Work_Sans, Yeseva_One } from "next/font/google";
import ChatbotWidget from "./-actions/ChatbotWidget";
import "./globals.css";
import QueryProviders from "./providers/QueryProvider";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const yesevaOne = Yeseva_One({
  weight: "400",
  variable: "--font-yeseva",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PH Healthcare Management System",
  description: "A comprehensive healthcare management system built with Next.js, TypeScript, and Tailwind CSS. This application provides features for managing patient records, appointments, billing, and more, ensuring efficient healthcare administration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${workSans.variable} ${yesevaOne.variable} antialiased font-sans`}
      >
        <QueryProviders>
          {children}
          <ChatbotWidget />
          <Toaster position="top-right" richColors />
        </QueryProviders>
      </body>
    </html>
  );
}
