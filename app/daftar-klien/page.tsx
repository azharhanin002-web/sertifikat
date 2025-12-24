import type { Metadata } from "next";
import Image from "next/image";
import { getClients } from "~/lib/sanity.client"; 
import { FaBuilding } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Daftar Klien | PT Solusi Sertifikasi",
  description: "Daftar perusahaan dan mitra yang telah mempercayakan legalitasnya kepada kami.",
};

export const revalidate = 10; 

export default async function ClientListPage() {
  const clients = await getClients();
  const dummyClients = Array(12).fill(null); 

  return (
    <main className="min-h-screen bg-white font-sans pb-20">
      
      {/* HEADER BACKGROUND */}
      {/* UPDATE: Tinggi ditambah jadi h-[450px] agar teks tidak keluar dari area biru */}
      <div className="bg-[#1e2338] h-[450px] w-full absolute top-0 left-0 z-0">
        <div className="w-full h-full bg-[#1e2338] opacity-95 absolute top-0 left-0"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      {/* CONTAINER CONTENT */}
      {/* UPDATE: pt-32 diubah jadi pt-28 agar posisi teks NAIK sedikit ke atas (ke tengah area biru) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-10">
        
        {/* JUDUL HALAMAN */}
        <div className="text-center text-white mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-md">Daftar Klien</h1>
            <p className="text-gray-200 text-lg max-w-2xl mx-auto font-medium">
              Kami bangga telah menjadi bagian dari pertumbuhan bisnis berbagai perusahaan di Indonesia.
            </p>
        </div>

        {/* GRID LOGO KLIEN */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 relative z-20">
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 items-center justify-center">
                
                {clients && clients.length > 0 ? (
                    clients.map((item: any, index: number) => (
                        <div 
                            key={index} 
                            className="group flex items-center justify-center p-4 h-28 border border-gray-100 rounded-xl hover:shadow-lg hover:border-blue-200 transition-all duration-300 bg-white relative"
                            title={item.name}
                        >
                            {item.logo ? (
                                <div className="relative w-full h-full">
                                    <Image 
                                        src={item.logo} 
                                        alt={item.name || 'Client Logo'} 
                                        fill 
                                        className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100"
                                    />
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center text-gray-300 w-full h-full">
                                    <FaBuilding className="text-2xl mb-1" />
                                    <span className="text-[10px] text-center font-bold text-gray-400 uppercase truncate w-full px-2">
                                        {item.name || 'No Logo'}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    // DUMMY DATA JIKA KOSONG
                    dummyClients.map((_, index) => (
                        <div key={index} className="flex items-center justify-center p-4 h-28 border border-gray-100 rounded-xl bg-gray-50">
                            <span className="text-gray-300 font-bold text-sm">LOGO {index + 1}</span>
                        </div>
                    ))
                )}

            </div>

            {clients && clients.length === 0 && (
                <div className="text-center py-10 text-gray-400 mt-8 border-t border-gray-100 pt-8">
                    <p>Belum ada data klien yang diupload.</p>
                </div>
            )}

        </div>

      </div>
    </main>
  );
}