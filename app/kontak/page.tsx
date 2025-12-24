import type { Metadata } from "next";
import Link from "next/link";
import { FaWhatsapp, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { getContacts } from "~/lib/sanity.client"; 

export const metadata: Metadata = {
  title: "Kontak Kami | PT Solusi Sertifikasi",
  description: "Hubungi cabang kami untuk konsultasi legalitas perusahaan Anda.",
};

export const revalidate = 10; 

export default async function ContactPage() {
  // 1. Ambil data LIST kontak (Array)
  const contactsData = await getContacts();

  // 2. Data Dummy (Jika Sanity Kosong, tampilkan 3 kartu ini agar layout terlihat)
  const dummyContacts = [
    {
      title: "KABUPATEN JAKARTA SELATAN",
      address: "Jl. Tj. Mas Utama No.44 Blok B1, RT.:002/RW:001/, Tj. Bar., Kec. Jagakarsa, Kota Jakarta Selatan, 12530",
      email: "jakarta@solusi.com",
      phone: "6289527862303"
    },
    {
      title: "CABANG SURABAYA",
      address: "Jl. Tunjungan No. 25, Genteng, Kota Surabaya, Jawa Timur 60275",
      email: "surabaya@solusi.com",
      phone: "6289527862303"
    },
    {
      title: "CABANG MEDAN",
      address: "Jl. Putri Hijau No. 10, Kesawan, Kota Medan, Sumatera Utara 20111",
      email: "medan@solusi.com",
      phone: "6289527862303"
    }
  ];

  // Gunakan data Sanity jika ada, jika tidak pakai dummy
  const contacts = (contactsData && contactsData.length > 0) ? contactsData : dummyContacts;

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      
      {/* HEADER BACKGROUND */}
      <div className="bg-[#1e2338] h-[400px] w-full absolute top-0 left-0 z-0">
        <div className="w-full h-full bg-[#1e2338] opacity-95 absolute top-0 left-0"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        
        {/* JUDUL HALAMAN */}
        <div className="text-center text-white mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Hubungi Kami</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Silakan hubungi cabang terdekat kami untuk konsultasi legalitas bisnis Anda.
            </p>
        </div>

        {/* GRID 3 KOLOM KARTU */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {contacts.map((item: any, index: number) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl p-8 border-t-8 border-[#4ade80] flex flex-col h-full hover:shadow-2xl transition-shadow duration-300">
                    
                    {/* Header Judul */}
                    <h2 className="text-xl font-extrabold text-[#1e2338] mb-6 uppercase tracking-wide border-b border-gray-100 pb-4 min-h-[80px] flex items-center">
                        {item.title}
                    </h2>

                    {/* Alamat */}
                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2 text-[#1e2338]">
                             <FaMapMarkerAlt className="text-[#4ade80] text-lg flex-shrink-0" />
                             <h3 className="text-base font-bold">Alamat :</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-sm pl-7 whitespace-pre-line">
                            {item.address}
                        </p>
                    </div>

                    {/* Email (PERMINTAAN BARU) */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-2 text-[#1e2338]">
                             <FaEnvelope className="text-[#4ade80] text-lg flex-shrink-0" />
                             <h3 className="text-base font-bold">Email :</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-sm pl-7">
                            {item.email || '-'}
                        </p>
                    </div>

                    {/* Tombol Hubungi */}
                    <div className="mt-auto">
                        <h3 className="text-sm font-bold text-gray-800 mb-3 pl-1">
                            Hubungi :
                        </h3>
                        <Link 
                            href={`https://wa.me/${item.phone ? item.phone.replace(/[^0-9]/g, '') : '6289527862303'}?text=Halo,%20saya%20ingin%20konsultasi%20legalitas%20di%20cabang%20${item.title}.`}
                            target="_blank"
                            className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-6 rounded-full shadow-md transition-all transform hover:-translate-y-1 group"
                        >
                            <FaWhatsapp className="text-2xl group-hover:scale-110 transition" />
                            <span>Hubungi Kami</span>
                        </Link>
                    </div>
                </div>
            ))}

        </div>

      </div>
    </main>
  );
}