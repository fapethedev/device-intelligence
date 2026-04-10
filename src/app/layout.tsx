import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { jetbrainsMono, spaceGroteskHeading } from "@/app/font"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Toaster } from "@/components/ui/sonner"

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
          <Navbar />
          <main className="grow">
            {children}
          </main>
          <Footer />
          <Toaster position="top-center" expand={true} richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
