import { siteConfig } from "~/config/site"
import { TailwindIndicator } from "~/components/tailwind-indicator"

interface PageLayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: ["Next.js", "React", "Legalitas", "Sertifikasi", "Sulteng"],
  authors: [
    {
      name: "Workshop Legalitas", // Diganti sesuai nama bisnis
      url: siteConfig.url,
    },
  ],
  creator: "Workshop Legalitas", // Diganti sesuai nama bisnis
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "id_ID", // Diganti ke Indonesia
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.png`],
    creator: "@workshop_legalitas", // Sesuaikan jika ada
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

// PERBAIKAN UTAMA: Hapus kata 'async' di depan function
export default function PageLayout({ children }: PageLayoutProps) {
  
  return (
    <div className="flex min-h-screen flex-col">
      
      {/* HEADER & FOOTER DIHAPUS DARI SINI 
          Karena sudah ditangani oleh Global Layout (app/layout.tsx)
      */}

      <main className="flex-1">
          {children}
      </main>

      <TailwindIndicator />
    </div>
  )
}