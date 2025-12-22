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
  keywords: ["Next.js", "React"],
  authors: [
    {
      name: "Workshop Legalitas",
      url: siteConfig.url,
    },
  ],
  creator: "Workshop Legalitas",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
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
    creator: "@workshop_legalitas",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

// PERBAIKAN: Kata 'async' SUDAH DIHAPUS di baris bawah ini
export default function PageLayout({ children }: PageLayoutProps) {
  
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
          {children}
      </main>
      <TailwindIndicator />
    </div>
  )
}