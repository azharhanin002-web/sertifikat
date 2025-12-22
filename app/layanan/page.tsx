import Image from 'next/image';
import Link from 'next/link';
import { getLayanan } from '~/lib/sanity.client';

export const revalidate = 10;

export default async function LayananPage() {
  const layananData = await getLayanan();

  // Mapping data
  const portfolioDisplay = (layananData && layananData.length > 0)
    ? layananData.map((item: any) => ({
        title: item.title,
        link: item.slug ? `/layanan/${item.slug}` : '#', 
        image: item.icon || '/mockup-migas.png', 
        desc: item.shortDesc || "Layanan profesional terpercaya."
    }))
    : [];

  return (
    <main className="min-h-screen bg-white font-sans">
      
      {/* HEADER */}
      <div className="bg-[#1e2338] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Layanan Kami</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Solusi lengkap untuk kebutuhan legalitas dan sertifikasi perusahaan Anda.
            </p>
            <div className="mt-8 flex justify-center items-center space-x-2 text-sm text-gray-400">
                <Link href="/" className="hover:text-[#4ade80] transition">Beranda</Link>
                <span>/</span>
                <span className="text-[#4ade80] font-bold">Layanan</span>
            </div>
        </div>
      </div>

      {/* GRID LAYANAN (SEMUA) */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {portfolioDisplay.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {portfolioDisplay.map((item: any, index: number) => (
                  <Link href={item.link} key={index} className="group relative h-[300px] rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all border border-gray-100 block">
                     <div className="absolute inset-0 bg-[#3b4363] opacity-0 group-hover:opacity-90 transition-opacity duration-300 z-10"></div>
                     
                     {item.image ? (
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                     ) : (
                        <div className="absolute inset-0 bg-gray-200"></div>
                     )}

                     <div className="absolute inset-0 flex flex-col items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition duration-300 px-4 text-center">
                        <span className="text-2xl font-bold text-white mb-2">LIHAT</span>
                        <p className="text-white text-xs">{item.desc}</p>
                     </div>

                     <div className="absolute bottom-0 left-0 p-6 w-full z-20 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="text-white text-lg font-bold leading-tight mb-2 drop-shadow-md">{item.title}</h3>
                        <div className="h-0.5 w-8 bg-gray-400 group-hover:w-16 transition-all duration-300"></div>
                     </div>
                  </Link>
               ))}
            </div>
        ) : (
            <div className="text-center py-20 text-gray-500">Belum ada layanan yang tersedia.</div>
        )}
      </div>

    </main>
  );
}