import type { Metadata } from "next";
import Link from "next/link";
import { FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaRegEnvelope } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Kontak Kami | PT Solusi Sertifikasi",
  description: "Hubungi kami untuk konsultasi legalitas dan sertifikasi perusahaan Anda.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      
      {/* HEADER BACKGROUND (DIPERTINGGI AGAR ADA RUANG UNTUK OVERLAP) */}
      <div className="bg-[#1e2338] h-[500px] w-full absolute top-0 left-0 z-0">
        <div className="w-full h-full bg-[#1e2338] opacity-90 absolute top-0 left-0"></div>
        {/* Pattern Overlay Tipis */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20">
        
        {/* JUDUL HALAMAN (POSISI DIPERBAIKI) */}
        {/* pt-10 agar tidak terlalu nempel dengan navbar, text-center untuk posisi tengah */}
        <div className="text-center text-white mb-16 pt-10">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-md">Hubungi Kami</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">Kami siap membantu kebutuhan legalitas bisnis Anda dengan pelayanan terbaik dan terpercaya.</p>
        </div>

        {/* GRID CONTENT (DITUMPUK KE ATAS BACKGROUND DENGAN NEGATIVE MARGIN) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* KARTU INFORMASI (Kiri - Sesuai Gambar) */}
            <div className="lg:col-span-1 bg-white rounded-2xl shadow-2xl p-8 border-t-8 border-[#4ade80] flex flex-col h-full relative z-20">
                
                {/* Header Kabupaten */}
                <h2 className="text-xl font-extrabold text-[#1e2338] mb-6 uppercase tracking-wide border-b border-gray-100 pb-4">
                    KABUPATEN ....................
                </h2>

                {/* Bagian Alamat */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2 text-[#1e2338]">
                         <FaMapMarkerAlt className="text-[#4ade80] text-lg" />
                         <h3 className="text-lg font-bold">Alamat :</h3>
                    </div>
                    {/* Teks Alamat */}
                    <p className="text-gray-600 leading-relaxed text-sm pl-7">
                        Jl. Tj. Mas Utama No.44 Blok B1, RT.:002/RW:001/,<br/>
                        Tj. Bar., Kec. Jagakarsa, Kota Jakarta Selatan,<br/>
                        12530
                    </p>
                </div>

                {/* Bagian Hubungi */}
                <div className="mt-auto">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2 pl-7">
                        Hubungi :
                    </h3>
                    <Link 
                        href="https://wa.me/6289527862303?text=Halo,%20saya%20ingin%20konsultasi%20mengenai%20legalitas."
                        target="_blank"
                        className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3.5 px-6 rounded-full shadow-lg transition-all transform hover:-translate-y-1 group"
                    >
                        <FaWhatsapp className="text-2xl group-hover:scale-110 transition" />
                        <span>Hubungi Kami</span>
                    </Link>
                </div>
            </div>

            {/* PETA LOKASI (Kanan - Maps Embed) */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 h-[450px] lg:h-auto relative z-20">
                <iframe 
                    src="https://maps.google.com/maps?q=Jl.+Tj.+Mas+Utama+No.44+Blok+B1,+Tanjung+Barat,+Jagakarsa,+Jakarta+Selatan&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 w-full h-full"
                ></iframe>
            </div>

        </div>

        {/* INFO TAMBAHAN (Di Bawah Grid) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-white p-6 rounded-xl flex items-center gap-4 border border-gray-200 shadow-md hover:shadow-lg transition">
                <div className="bg-blue-50 p-4 rounded-full text-blue-600">
                    <FaPhoneAlt className="text-xl" />
                </div>
                <div>
                    <h4 className="font-bold text-[#1e2338] text-lg">Telepon Kantor</h4>
                    <p className="text-gray-500">+62 895-2786-2303</p>
                </div>
             </div>
             <div className="bg-white p-6 rounded-xl flex items-center gap-4 border border-gray-200 shadow-md hover:shadow-lg transition">
                <div className="bg-green-50 p-4 rounded-full text-green-600">
                    <FaRegEnvelope className="text-xl" />
                </div>
                <div>
                    <h4 className="font-bold text-[#1e2338] text-lg">Email Resmi</h4>
                    <p className="text-gray-500">ss.sulteng@gmail.com</p>
                </div>
             </div>
        </div>

      </div>
    </main>
  );
}