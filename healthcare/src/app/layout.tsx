import { Toaster } from "@/components/ui/sonner";
import CookieConsentBanner from "@/components/shared/CookieConsentBanner";
import ServiceWorkerRegister from "@/components/shared/ServiceWorkerRegister";
import type { Metadata } from "next";
import { Work_Sans, Yeseva_One } from "next/font/google";
import ChatbotWidget from "./-actions/ChatbotWidget";
import "./globals.css";
import QueryProviders from "./providers/QueryProvider";
import ThemeProvider from "./providers/ThemeProvider";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";

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
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "MEDdical",
    statusBarStyle: "default",
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
        className={`${workSans.variable} ${yesevaOne.variable} antialiased font-sans`}
      >
        <a
          href="#main-content"
          className="sr-only rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <LanguageProvider>
            <QueryProviders>
              {children}
              <ChatbotWidget />
              <Toaster position="top-right" richColors />
              <CookieConsentBanner />
              <ServiceWorkerRegister />
            </QueryProviders>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
