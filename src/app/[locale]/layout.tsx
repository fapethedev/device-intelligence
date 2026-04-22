import React from "react"
import { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { jetbrainsMono, spaceGroteskHeading } from "@/app/font"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { routing } from "@/i18n/routing"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: {
    template: `%s | Device Intelligence`,
    default: "Device Intelligence",
    absolute: "Device Intelligence"
  },
  description: "A full Clientjs and ip address fingerprinter based on what your device tel about you and itself",
  applicationName: "Device Intelligence",
  publisher: "Fapethedev",
  creator: "Fapethedev",
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: {
      template: `%s | Device Intelligence`,
      default: "Device Intelligence",
      absolute: "Device Intelligence"
    },
    description: "A full Clientjs and ip address fingerprinter based on what your device tel about you and itself",
    type: "website",
},
  twitter: {
    title: {
      template: `%s | Device Intelligence`,
      default: "Device Intelligence",
      absolute: "Device Intelligence"
    },
    description: "A full Clientjs and ip address fingerprinter based on what your device tel about you and itself",
      creator: "Fapethedev",
      card: "summary",
      site: "Device Intelligence",
  },
  appleWebApp: {
    capable: true,
      statusBarStyle: "default",
      title: "Device Intelligence",
      startupImage: "/icon-512x512.png",
  },
  formatDetection: {
    telephone: false,
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode,
  params: Promise<{locale: string}>
}>) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", "font-mono", jetbrainsMono.variable, spaceGroteskHeading.variable)}
    >
      <body className="flex flex-col min-h-screen">
      <NextIntlClientProvider>
        <ThemeProvider>
          <TooltipProvider>
            <Navbar />
            <main className="grow">
              {children}
            </main>
            <Footer />
            <Toaster position="top-center" expand={true} richColors />
          </TooltipProvider>
        </ThemeProvider>
      </NextIntlClientProvider>
      </body>
    </html>
  )
}
