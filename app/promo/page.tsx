import Link from 'next/link';
import Image from 'next/image';
import { getPromo } from '~/lib/sanity.client';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

export const revalidate = 10;

export default async function PromoPage() {
  const promos = await getPromo();

  return (
    <main className="min-h-screen bg-gray-50 font-sans pb-20">
      
      {/* HEADER */}
      <div className="bg-[#1e2338] text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Promo Spesial</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Dapatkan penawaran terbaik untuk kebutuhan legalitas dan perizinan usaha Anda bulan ini.
            </p>
        </div>
      </div>

      {/* LIST PROMO */}
      <div className="max-w-7xl mx-auto px-6">
        {promos && promos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promos.map((item: any, index: number) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group flex flex-col h-full">
                
                {/* PERBAIKAN GAMBAR:
                   1. Menggunakan 'aspect-video' (16:9) agar proporsional di semua layar.
                   2. Tetap menggunakan 'object-cover' agar rapi, tapi karena rasionya sudah 16:9, kemungkinan terpotongnya bagian penting sangat kecil (standar banner).
                   3. Jika Anda ingin GAMBAR UTUH 100% tanpa terpotong sama sekali, ganti 'object-cover' dengan 'object-contain' dan beri bg-gray-100 pada div pembungkusnya.
                */}
                <div className="relative w-full aspect-video bg-gray-100 overflow-hidden">
                  {item.image ? (
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                  )}
                  {/* Badge Promo */}
                  <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md z-10">
                    HOT PROMO
                  </div>
                </div>

                {/* Konten (Flex-grow agar tinggi kartu seragam) */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-xs text-gray-500 mb-3 space-x-2">
                    <FaCalendarAlt className="text-blue-500" />
                    <span>{item.period || 'Periode Terbatas'}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1e2338] mb-3 line-clamp-2 group-hover:text-blue-600 transition">
                    {item.title}
                  </h3>

                  {/* Spacer untuk mendorong tombol ke bawah */}
                  <div className="mt-auto pt-4">
                      <Link 
                        href={`/promo/${item.slug}`} 
                        className="inline-flex items-center text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-md transition w-full justify-center"
                      >
                        Lihat Detail <FaArrowRight className="ml-2 text-xs" />
                      </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
              <h3 className="text-2xl font-bold mb-2">Belum ada promo aktif.</h3>
              <p>Nantikan penawaran menarik dari kami segera.</p>
          </div>
        )}
      </div>

    </main>
  );
}