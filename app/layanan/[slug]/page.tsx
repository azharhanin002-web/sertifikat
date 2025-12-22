import { getLayananBySlug } from "~/lib/sanity.client";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";

export default async function LayananDetailPage({ params }: { params: { slug: string } }) {
  
  const data = await getLayananBySlug(params.slug);
  if (!data) return notFound();

  return (
    <main className="min-h-screen font-sans bg-white py-20">
      <div className="max-w-4xl mx-auto px-6">
          <div className="text-sm text-gray-500 mb-6">Beranda / Layanan / <span className="text-blue-900 font-bold">{data.title}</span></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-8 border-b pb-6">{data.title}</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              {data.description ? <PortableText value={data.description} /> : <p className="italic text-gray-400">Belum ada deskripsi.</p>}
          </div>

          <div className="mt-12 p-8 bg-blue-50 rounded-xl border border-blue-100 text-center">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Tertarik dengan layanan ini?</h3>
              <a href={`https://wa.me/6289527862303?text=Halo, saya ingin konsultasi mengenai ${data.title}`} target="_blank" className="inline-flex items-center bg-green-500 text-white font-bold py-3 px-8 rounded-full hover:bg-green-600 transition shadow-lg">
                  <FaWhatsapp className="mr-2 text-xl" /> Hubungi via WhatsApp
              </a>
          </div>
      </div>
    </main>
  );
}