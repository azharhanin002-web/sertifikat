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
      name: "Darius Pasca",
      url: "https://github.com/dariuspasca",
    },
  ],
  creator: "Darius Pasca",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
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
    creator: "@dariuspasca",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export default async function PageLayout({ children }: PageLayoutProps) {
  // Kita tidak perlu memanggil getSettingsPage atau getFooter lagi
  // karena kita menggunakan Navbar dan Footer custom di page.tsx

  return (
    <div className="flex min-h-screen flex-col">
      
      {/* HEADER LAMA SUDAH DIHAPUS DI SINI 
         Agar tidak bentrok dengan Navbar custom kita 
      */}

      <main className="flex-1">
          {children}
      </main>

      {/* FOOTER LAMA SUDAH DIHAPUS DI SINI 
      */}

      <TailwindIndicator />
    </div>
  )
}