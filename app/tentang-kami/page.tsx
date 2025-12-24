import type { Metadata } from "next";
import Image from "next/image";
import { getAboutPage } from "~/lib/sanity.client";
import { PortableText } from "@portabletext/react";
import { FaCheckCircle, FaQuoteLeft } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Tentang Kami | PT Solusi Sertifikasi",
  description: "Profil perusahaan, visi misi, dan komitmen kami dalam melayani legalitas bisnis Anda.",
};

export const revalidate = 10;

export default async function AboutPage() {
  const data = await getAboutPage();

  // Data Dummy (Fallback jika Sanity kosong)
  const content = {
    title: data?.title || "Tentang Kami",
    heroImage: data?.heroImage || "/neo.webp", // Pastikan ada gambar default di public folder
    vision: data?.vision || "Menjadi mitra strategis terdepan dalam layanan legalitas dan sertifikasi yang terpercaya di Indonesia.",
    mission: data?.mission || [
        "Memberikan pelayanan yang cepat, transparan, dan akuntabel.",
        "Membantu pelaku usaha mendapatkan legalitas dengan mudah.",
        "Menjaga standar kualitas layanan profesional.",
        "Memberikan solusi terbaik bagi setiap kendala perizinan."
    ],
    ceoName: data?.ceoName || "Bpk. Pimpinan",
    ceoMessage: data?.ceoMessage || "Komitmen kami adalah memberikan rasa aman dan nyaman bagi setiap pengusaha dalam menjalankan bisnisnya melalui kepastian hukum dan legalitas yang lengkap.",
    ceoImage: data?.ceoImage || "/user-1.jpg", // Gambar default user
    // Jika overview kosong (belum diisi di sanity), kita pakai null agar tidak error di PortableText
    overview: data?.overview 
  };

  return (
    <main className="min-h-screen bg-white font-sans">
      
      {/* 1. HERO SECTION */}
      <div className="relative h-[400px] flex items-center justify-center overflow-hidden bg-[#1e2338]">
         <div className="absolute inset-0 z-0 opacity-40">
            <Image 
                src={content.heroImage} 
                alt="Tentang Kami" 
                fill 
                className="object-cover"
            />
         </div>
         <div className="relative z-10 text-center px-6">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4">
                {content.title}
            </h1>
            <div className="h-1 w-24 bg-[#4ade80] mx-auto rounded-full"></div>
         </div>
      </div>

      {/* 2. MAIN CONTENT (PROFILE & CEO MESSAGE) */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Kiri: Deskripsi Perusahaan */}
            <div>
                <h2 className="text-3xl font-bold text-[#1e2338] mb-6">Profil Perusahaan</h2>
                <div className="text-gray-600 leading-relaxed text-lg space-y-4">
                    {content.overview ? (
                        <PortableText value={content.overview} />
                    ) : (
                        <p>
                            PT Solusi Sertifikasi adalah perusahaan konsultan yang bergerak di bidang jasa pengurusan legalitas badan usaha, sertifikasi ISO, SBU Konstruksi, dan perizinan lainnya. 
                            Kami hadir untuk memberikan solusi praktis bagi para pengusaha yang membutuhkan kepastian hukum dalam menjalankan bisnisnya.
                            <br/><br/>
                            Didukung oleh tim profesional yang berpengalaman, kami telah membantu ratusan perusahaan di seluruh Indonesia untuk mendapatkan dokumen legalitas mereka dengan proses yang cepat dan transparan.
                        </p>
                    )}
                </div>
            </div>

            {/* Kanan: Pesan CEO / Foto */}
            <div className="relative">
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-lg relative mt-10 lg:mt-0">
                    <FaQuoteLeft className="text-4xl text-[#4ade80] opacity-30 absolute top-6 left-6" />
                    <p className="text-gray-600 italic text-lg relative z-10 mb-6 pt-6">
                        "{content.ceoMessage}"
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full overflow-hidden relative border-2 border-[#4ade80]">
                            <Image 
                                src={content.ceoImage} 
                                alt={content.ceoName} 
                                fill 
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h4 className="font-bold text-[#1e2338] text-lg">{content.ceoName}</h4>
                            <span className="text-sm text-gray-500">CEO / Direktur Utama</span>
                        </div>
                    </div>
                </div>
            </div>

         </div>
      </section>

      {/* 3. VISI & MISI */}
      <section className="bg-gray-50 py-20 px-6">
          <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* VISI */}
                  <div className="bg-white p-10 rounded-2xl shadow-sm border-l-8 border-blue-600 hover:shadow-md transition">
                      <h3 className="text-2xl font-bold text-[#1e2338] mb-4">Visi Kami</h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                          {content.vision}
                      </p>
                  </div>

                  {/* MISI */}
                  <div className="bg-white p-10 rounded-2xl shadow-sm border-l-8 border-[#4ade80] hover:shadow-md transition">
                      <h3 className="text-2xl font-bold text-[#1e2338] mb-6">Misi Kami</h3>
                      <ul className="space-y-3">
                          {content.mission.map((misi: string, index: number) => (
                              <li key={index} className="flex items-start gap-3 text-gray-600 text-lg">
                                  <FaCheckCircle className="text-[#4ade80] mt-1 flex-shrink-0" />
                                  <span>{misi}</span>
                              </li>
                          ))}
                      </ul>
                  </div>

              </div>
          </div>
      </section>

    </main>
  );
}