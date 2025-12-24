import type { Metadata } from "next";
import Image from "next/image";
import { FaStar, FaQuoteLeft, FaUserTie } from "react-icons/fa";
import { getTestimonials } from "~/lib/sanity.client"; // Pastikan import ini benar

export const revalidate = 10;

export const metadata: Metadata = {
  title: "Testimoni Klien | PT Solusi Sertifikasi",
  description: "Apa kata mereka tentang layanan legalitas dan sertifikasi kami.",
};

export default async function TestimoniPage() {
  
  // 1. Fetch data dari Sanity
  const sanityTestimonials = await getTestimonials();

  // 2. Data Dummy (Fallback jika Sanity kosong)
  const dummyTestimonials = [
    { 
        name: "Melanie", 
        role: "Pengusaha - Bandar Lampung", 
        text: "Terimakasih telah membantu pendirian PT saya. Team menjelaskan dengan detail setiap pertanyaan yang saya ajukan.", 
        image: "/user-1.jpg",
        rating: 5
    },
    { 
        name: "Budi Santoso", 
        role: "Kontraktor - Jakarta", 
        text: "Proses pengerjaan SBU di Workshop Legalitas cepat dan sesuai dengan kebutuhan. Pelayanan dari team memuaskan.", 
        image: "/user-2.jpg",
        rating: 5
    },
    // ... data dummy lainnya bisa ditambahkan ...
  ];

  // 3. Gunakan data Sanity jika ada, jika tidak pakai dummy
  const testimonials = (sanityTestimonials && sanityTestimonials.length > 0) 
    ? sanityTestimonials.map((item: any) => ({
        name: item.name,
        role: item.role,
        text: item.message,
        image: item.image,
        rating: item.rating || 5 // Default rating 5 jika tidak diisi
      }))
    : dummyTestimonials;

  return (
    <main className="min-h-screen bg-gray-50 font-sans pb-20">
      
      {/* HEADER SECTION */}
      <div className="bg-[#1e2338] text-white py-20 mb-12 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
         <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#4ade80] opacity-10 rounded-full blur-2xl transform -translate-x-1/3 translate-y-1/3"></div>

         <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Kisah Sukses Klien Kami</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Kepercayaan Anda adalah prioritas kami. Berikut adalah pengalaman nyata dari para mitra yang telah menggunakan layanan kami.
            </p>
         </div>
      </div>

      {/* GRID TESTIMONI */}
      <div className="max-w-7xl mx-auto px-6">
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((item: any, index: number) => (
               <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col relative group h-full">
                  
                  {/* Ikon Kutipan Besar */}
                  <div className="absolute top-4 right-6 text-6xl text-gray-100 font-serif opacity-50 group-hover:text-blue-50 transition-colors duration-300">
                     <FaQuoteLeft />
                  </div>

                  {/* Rating Bintang Dinamis */}
                  <div className="flex space-x-1 text-yellow-400 mb-6 text-sm relative z-10">
                     {[...Array(item.rating || 5)].map((_, i) => <FaStar key={i} />)}
                  </div>

                  {/* Isi Testimoni */}
                  <p className="text-gray-600 text-base leading-relaxed mb-8 flex-grow relative z-10 italic">
                     "{item.text}"
                  </p>

                  {/* Profil User */}
                  <div className="flex items-center pt-4 border-t border-gray-50 mt-auto">
                     <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-4 flex-shrink-0 border-2 border-white shadow-sm flex items-center justify-center relative">
                        {item.image ? (
                           <Image 
                             src={item.image} 
                             alt={item.name} 
                             fill
                             className="object-cover"
                           />
                        ) : (
                           <FaUserTie className="text-gray-400 text-2xl" />
                        )}
                     </div>
                     <div>
                        <h4 className="font-bold text-[#1e2338] text-base line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-[#4ade80] font-bold uppercase tracking-wide line-clamp-1">{item.role}</p>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         {/* CTA Section */}
         <div className="mt-20 bg-white rounded-3xl p-10 md:p-16 text-center shadow-lg border border-gray-100 relative overflow-hidden">
             <div className="relative z-10">
                 <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e2338] mb-4">Ingin Menjadi Cerita Sukses Berikutnya?</h2>
                 <p className="text-gray-500 mb-8 max-w-xl mx-auto">Konsultasikan kebutuhan legalitas perusahaan Anda sekarang juga. Gratis konsultasi awal.</p>
                 <a 
                   href="https://wa.me/6289527862303?text=Halo%20Admin,%20saya%20tertarik%20konsultasi%20legalitas." 
                   target="_blank"
                   className="inline-block bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-10 rounded-full shadow-lg transition transform hover:-translate-y-1"
                 >
                    Hubungi Kami via WhatsApp
                 </a>
             </div>
         </div>

      </div>
    </main>
  );
}