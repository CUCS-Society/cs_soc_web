import type { Metadata } from "next"
import { Inter, Gelasio, JetBrains_Mono } from "next/font/google"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Footer } from "@/components/soc_web/Footer"
import { Header } from "@/components/soc_web/Header"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontSerif = Gelasio({
  subsets: ["latin"],
  variable: "--font-serif",
})

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Computer Science Society",
  description: "Computer Science Society",
}

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{
    lang: string
  }>
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { lang } = await params

  return (
    <html lang={lang}>
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Header lang={lang} />
          <div className="mx-auto w-[90%] max-w-none py-10 lg:w-1/2">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
