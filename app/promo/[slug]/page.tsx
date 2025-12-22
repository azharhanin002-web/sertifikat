import { getPromoBySlug } from "~/lib/sanity.client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaCalendarAlt, FaWhatsapp, FaTag } from "react-icons/fa";

export default async function PromoDetailPage({ params }: { params: { slug: string } }) {
  
  const data = await getPromoBySlug(params.slug);
  if (!data) return notFound();

  return (
    <main className="min-h-screen font-sans bg-white py-20">
      <div className="max-w-4xl mx-auto px-6">
          <div className="text-sm text-gray-500 mb-6 flex items-center gap-2"><span>Beranda</span> / <span>Promo</span> / <span className="text-orange-500 font-bold">{data.title}</span></div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="relative h-64 md:h-96 w-full bg-gray-200">
                  {data.image ? <Image src={data.image} alt={data.title} fill className="object-cover"/> : <div className="flex flex-col items-center justify-center h-full text-gray-400 font-bold bg-gray-100"><FaTag className="text-4xl mb-2 opacity-50"/><span>Banner Promo Tidak Tersedia</span></div>}
                  {data.period && <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-orange-500 text-white px-5 py-2 rounded-full font-bold shadow-lg flex items-center text-sm md:text-base border-2 border-white"><FaCalendarAlt className="mr-2" /> {data.period}</div>}
              </div>

              <div className="p-8 md:p-12">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-6 leading-tight">{data.title}</h1>
                  <hr className="border-gray-100 mb-8" />
                  
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                      {data.description ? <PortableText value={data.description} /> : <p className="italic text-gray-400">Tidak ada deskripsi tambahan untuk promo ini.</p>}
                  </div>

                  <div className="mt-12 text-center bg-blue-50 p-8 rounded-xl border border-blue-100">
                      <h3 className="text-blue-900 font-bold text-lg mb-4">Tertarik dengan penawaran ini?</h3>
                      <a href={`https://wa.me/6289527862303?text=Halo Admin, saya ingin klaim promo: ${data.title}`} target="_blank" className="inline-flex items-center bg-green-500 text-white font-bold text-lg py-3 px-8 rounded-full hover:bg-green-600 transition shadow-lg transform hover:-translate-y-1 hover:shadow-xl">
                          <FaWhatsapp className="mr-2 text-2xl" /> Ambil Promo Sekarang
                      </a>
                  </div>
              </div>
          </div>
      </div>
    </main>
  );
}