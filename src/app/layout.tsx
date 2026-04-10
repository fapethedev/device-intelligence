import React from "react"
import { Metadata } from "next";

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { jetbrainsMono, spaceGroteskHeading } from "@/app/font"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", "font-mono", jetbrainsMono.variable, spaceGroteskHeading.variable)}
    >
      <body className="flex flex-col min-h-screen">
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
      </body>
    </html>
  )
}
