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
  const contactsData = await getContacts();

  // Data dummy disesuaikan jadi 4 untuk simulasi tampilan
  const dummyContacts = Array(4).fill({
      title: "KABUPATEN CONTOH",
      address: "Jl. Merdeka No. 45, Kelurahan Bungin, Kecamatan Luwuk, Kabupaten Banggai, Sulawesi Tengah",
      email: "ss.sulteng@gmail.com",
      phone: "6289527862303"
  });

  const contacts = (contactsData && contactsData.length > 0) ? contactsData : dummyContacts;

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      
      {/* HEADER BACKGROUND */}
      <div className="bg-[#1e2338] h-[400px] w-full absolute top-0 left-0 z-0">
        <div className="w-full h-full bg-[#1e2338] opacity-95 absolute top-0 left-0"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      {/* CONTAINER: Kembali ke max-w-7xl agar sejajar dengan Footer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        
        {/* JUDUL HALAMAN */}
        <div className="text-center text-white mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Hubungi Kami</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Silakan hubungi cabang terdekat kami untuk konsultasi legalitas bisnis Anda.
            </p>
        </div>

        {/* GRID 4 KOLOM (lg:grid-cols-4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {contacts.map((item: any, index: number) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-5 border-t-4 border-[#4ade80] flex flex-col h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    
                    {/* Header Judul */}
                    <h2 className="text-base font-extrabold text-[#1e2338] mb-3 uppercase tracking-wide border-b border-gray-100 pb-2 leading-tight min-h-[40px] flex items-end">
                        {item.title}
                    </h2>

                    {/* Alamat */}
                    <div className="mb-3 flex-grow">
                        <div className="flex items-center gap-2 mb-1 text-[#1e2338]">
                             <FaMapMarkerAlt className="text-[#4ade80] text-sm flex-shrink-0" />
                             <h3 className="text-xs font-bold uppercase">Alamat :</h3>
                        </div>
                        <p className="text-gray-600 leading-snug text-xs pl-5 whitespace-pre-line">
                            {item.address}
                        </p>
                    </div>

                    {/* Email */}
                    <div className="mb-5">
                        <div className="flex items-center gap-2 mb-1 text-[#1e2338]">
                             <FaEnvelope className="text-[#4ade80] text-sm flex-shrink-0" />
                             <h3 className="text-xs font-bold uppercase">Email :</h3>
                        </div>
                        <p className="text-gray-600 leading-snug text-xs pl-5 truncate" title={item.email}>
                            {item.email || '-'}
                        </p>
                    </div>

                    {/* Tombol Hubungi */}
                    <div className="mt-auto pt-2 flex justify-start">
                        <Link 
                            href={`https://wa.me/${item.phone ? item.phone.replace(/[^0-9]/g, '') : '6289527862303'}?text=Halo,%20saya%20ingin%20konsultasi%20legalitas%20di%20cabang%20${item.title}.`}
                            target="_blank"
                            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-2 px-4 rounded-full shadow-md transition-all text-xs w-full justify-center"
                        >
                            <FaWhatsapp className="text-lg" />
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