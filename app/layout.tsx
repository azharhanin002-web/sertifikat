import { Inter, Poppins } from "next/font/google"

import "~/styles/globals.css"
import { siteConfig } from "~/config/site"
import { cn } from "lib/utils"
import { TailwindIndicator } from "~/components/tailwind-indicator"

// --- IMPORT WRAPPER BARU (PENTING) ---
import LayoutWrapper from "~/components/LayoutWrapper"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontHeading = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-heading",
})

interface RootLayoutProps {
  children: React.ReactNode
}

// Metadata Website Global
export const metadata = {
  title: {
    default: "Solusi Sertifikat | Solusi Sertifikasi Sulteng",
    template: `%s | Solusi Sertifikasi Sulteng`,
  },
  metadataBase: new URL(siteConfig.url),
  description: "Jasa pembuatan legalitas perusahaan terpercaya dan sertifikasi di Sulawesi Tengah.",
  keywords: ["Next.js", "React", "Legalitas", "Workshop", "Sertifikasi", "Sulteng"],
  authors: [
    {
      name: "Solusi Sertifikasi Sulteng",
      url: siteConfig.url,
    },
  ],
  creator: "Solusi Sertifikasi Sulteng",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        {/* KITA BUNGKUS KONTEN DENGAN LayoutWrapper.
            Wrapper ini yang akan mikir: "Tampilin Header gak ya?"
        */}
        <LayoutWrapper>
            {children}
        </LayoutWrapper>

        {/* Indikator Tailwind (Hanya muncul saat Development) */}
        <TailwindIndicator />
      </body>
    </html>
  )
}