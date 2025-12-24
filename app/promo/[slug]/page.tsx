import { getPromoBySlug } from "~/lib/sanity.client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaCalendarAlt, FaWhatsapp, FaTag } from "react-icons/fa";
import Link from "next/link";

export const revalidate = 10;

export default async function PromoDetailPage({ params }: { params: { slug: string } }) {
  
  const data = await getPromoBySlug(params.slug);
  if (!data) return notFound();

  return (
    <main className="min-h-screen font-sans bg-white py-20">
      <div className="max-w-4xl mx-auto px-6">
          
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-blue-600">Beranda</Link> 
            <span>/</span> 
            <Link href="/promo" className="hover:text-blue-600">Promo</Link> 
            <span>/</span> 
            <span className="text-orange-500 font-bold truncate">{data.title}</span>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              
              {/* GAMBAR (DIPERBAIKI: Tidak Terpotong) */}
              {/* Menggunakan aspect-video agar rasio kotak tetap 16:9 */}
              {/* Menggunakan object-contain agar gambar pas di dalam kotak tanpa terpotong */}
              {/* Background abu-abu terang untuk mengisi ruang kosong jika rasio gambar beda */}
              <div className="relative w-full aspect-video bg-gray-100 flex items-center justify-center">
                  {data.image ? (
                    <Image 
                      src={data.image} 
                      alt={data.title} 
                      fill 
                      className="object-contain" // KUNCI AGAR TIDAK TERPOTONG
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 font-bold">
                        <FaTag className="text-4xl mb-2 opacity-50"/>
                        <span>Banner Promo Tidak Tersedia</span>
                    </div>
                  )}

                  {/* Badge Periode (Pindah ke pojok atas agar tidak menutupi info penting di bawah gambar) */}
                  {data.period && (
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-1.5 rounded-full font-bold shadow-md flex items-center text-xs md:text-sm border border-white z-10">
                        <FaCalendarAlt className="mr-2" /> {data.period}
                    </div>
                  )}
              </div>

              <div className="p-8 md:p-12">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-6 leading-tight">{data.title}</h1>
                  <hr className="border-gray-100 mb-8" />
                  
                  {/* Deskripsi dengan PortableText + Styling untuk List/Bold */}
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                      {data.description ? (
                        <PortableText 
                          value={data.description} 
                          components={{
                            list: {
                              bullet: ({children}) => <ul className="list-disc pl-5 mb-4">{children}</ul>,
                              number: ({children}) => <ol className="list-decimal pl-5 mb-4">{children}</ol>,
                            },
                            marks: {
                              strong: ({children}) => <span className="font-bold text-gray-900">{children}</span>
                            }
                          }}
                        />
                      ) : (
                        <p className="italic text-gray-400">Tidak ada deskripsi tambahan untuk promo ini.</p>
                      )}
                  </div>

                  {/* Call to Action */}
                  <div className="mt-12 text-center bg-blue-50 p-8 rounded-xl border border-blue-100">
                      <h3 className="text-blue-900 font-bold text-lg mb-4">Tertarik dengan penawaran ini?</h3>
                      <a 
                        href={`https://wa.me/6289527862303?text=Halo Admin, saya ingin klaim promo: ${data.title}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-green-500 text-white font-bold text-lg py-3 px-8 rounded-full hover:bg-green-600 transition shadow-lg transform hover:-translate-y-1 hover:shadow-xl"
                      >
                          <FaWhatsapp className="mr-2 text-2xl" /> Ambil Promo Sekarang
                      </a>
                  </div>
              </div>
          </div>
      </div>
    </main>
  );
}