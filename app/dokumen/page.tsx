import Link from 'next/link';
import { getDokumen } from '~/lib/sanity.client';

export const revalidate = 10;

export default async function DokumenPage() {
  const dokumen = await getDokumen();

  return (
    <main className="min-h-screen bg-white font-sans">
      
      {/* HEADER */}
      <div className="bg-[#1e2338] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Pusat Unduhan</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Download dokumen resmi dan regulasi terbaru di sini.
            </p>
            <div className="mt-8 flex justify-center items-center space-x-2 text-sm text-gray-400">
                <Link href="/" className="hover:text-[#4ade80] transition">Beranda</Link>
                <span>/</span>
                <span className="text-[#4ade80] font-bold">Dokumen</span>
            </div>
        </div>
      </div>

      {/* LIST DOKUMEN (GRID 3 KOLOM) */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {dokumen && dokumen.length > 0 ? (
          // GRID 3 KOLOM
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dokumen.map((doc: any, index: number) => (
              <div key={index} className="flex items-end justify-between border-b border-gray-100 pb-6 hover:bg-gray-50 transition p-4 rounded-lg">
                
                {/* BAGIAN KIRI: Judul, Tanggal, Ukuran */}
                <div className="flex flex-col gap-1 pr-4">
                    {/* Judul Dokumen */}
                    <h3 className="text-lg font-bold text-[#1e2338] leading-tight">
                        {doc.title}
                    </h3>
                    
                    {/* Tanggal (Dummy / Statis) */}
                    <span className="text-xs text-gray-500 mt-1">
                        11 Okt 2025
                    </span>

                    {/* Ukuran File (Warna Hijau) */}
                    <span className="text-xs font-bold text-green-600">
                        Ukuran : 4 MB
                    </span>
                </div>

                {/* BAGIAN KANAN: Tombol Download Oranye */}
                <div className="flex-shrink-0">
                    <a 
                        href={`${doc.fileUrl}?dl=`} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[#ff9800] hover:bg-[#e68900] text-white font-bold py-2 px-6 rounded-md text-sm transition shadow-sm"
                    >
                        Download
                    </a>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
             <h3 className="text-2xl font-bold text-gray-400">Belum ada dokumen.</h3>
          </div>
        )}
      </div>

    </main>
  );
}