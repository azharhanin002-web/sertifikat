import Image from "next/image"; // <--- Jangan lupa import ini
import { getLayananBySlug } from "~/lib/sanity.client";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";

export const revalidate = 10;

export default async function LayananDetailPage({ params }: { params: { slug: string } }) {
  
  // Ambil data dari Sanity
  const data = await getLayananBySlug(params.slug);
  
  if (!data) return notFound();

  return (
    <main className="min-h-screen font-sans bg-white py-20">
      <div className="max-w-4xl mx-auto px-6">
          
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-6">
            Beranda / Layanan / <span className="text-blue-900 font-bold">{data.title}</span>
          </div>
          
          {/* Judul Halaman */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-8 border-b border-gray-100 pb-6">
            {data.title}
          </h1>
          
          {/* --- GAMBAR UTAMA (DITAMBAHKAN DI SINI) --- */}
          {data.icon && (
            <div className="relative w-full h-[300px] md:h-[450px] mb-10 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <Image 
                src={data.icon} 
                alt={data.title} 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          )}

          {/* Deskripsi (Portable Text) */}
          <div className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed">
              {data.description ? (
                <PortableText value={data.description} />
              ) : (
                <p className="italic text-gray-400 bg-gray-50 p-4 rounded border">
                  Belum ada deskripsi lengkap untuk layanan ini.
                </p>
              )}
          </div>

          {/* Call To Action (WhatsApp) */}
          <div className="mt-12 p-8 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 text-center shadow-sm">
              <h3 className="text-xl font-bold text-blue-900 mb-2">Butuh Bantuan?</h3>
              <p className="text-gray-600 mb-6 text-sm">
                Konsultasikan kebutuhan legalitas perusahaan Anda dengan tim ahli kami.
              </p>
              
              <a 
                href={`https://wa.me/6289527862303?text=Halo Admin, saya tertarik dengan layanan *${data.title}*. Mohon infonya.`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#25D366] text-white font-bold py-3 px-8 rounded-full hover:bg-[#1ebc57] transition shadow-lg transform hover:-translate-y-1"
              >
                  <FaWhatsapp className="mr-2 text-xl" /> 
                  Hubungi via WhatsApp
              </a>
          </div>

      </div>
    </main>
  );
}