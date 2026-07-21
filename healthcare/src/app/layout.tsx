import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Work_Sans, Yeseva_One } from "next/font/google";
import ChatbotWidget from "./-actions/ChatbotWidget";
import "./globals.css";
import QueryProviders from "./providers/QueryProvider";
import ThemeProvider from "./providers/ThemeProvider";

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
  title: {
    default: "MEDdical — Leading the Way in Medical Excellence",
    template: "%s | MEDdical",
  },
  description: "MEDdical connects you with qualified specialists, digital prescriptions, and diagnostic services so your care team stays coordinated from the very first visit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${workSans.variable} ${yesevaOne.variable} antialiased font-sans`}
      >
        <ThemeProvider>
          <QueryProviders>
            {children}
            <ChatbotWidget />
            <Toaster position="top-right" richColors />
          </QueryProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
