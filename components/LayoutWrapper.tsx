"use client"

import { usePathname } from "next/navigation"
import Header from "~/components/Header"
import Footer from "~/components/Footer"
import FloatingWhatsApp from "~/components/FloatingWhatsApp"

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Cek apakah URL diawali dengan "/studio"
  const isStudio = pathname?.startsWith("/studio")

  // JIKA SEDANG DI STUDIO: Tampilkan isinya saja (Tanpa Header/Footer)
  if (isStudio) {
    return <>{children}</>
  }

  // JIKA DI WEBSITE UTAMA: Tampilkan lengkap dengan Header & Footer
  return (
    <>
      <Header />
      {children}
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}