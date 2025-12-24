import type { Metadata } from "next";
import Link from "next/link";
import { FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { getContact } from "~/lib/sanity.client"; 

export const metadata: Metadata = {
  title: "Kontak Kami | PT Solusi Sertifikasi",
  description: "Hubungi kami untuk konsultasi legalitas dan sertifikasi perusahaan Anda.",
};

export const revalidate = 10; 

export default async function ContactPage() {
  const contactData = await getContact();

  const data = {
    title: contactData?.title || "KABUPATEN ....................",
    address: contactData?.address || "Jl. Tj. Mas Utama No.44 Blok B1, RT.:002/RW:001/, Tj. Bar., Kec. Jagakarsa, Kota Jakarta Selatan, 12530",
    phone: contactData?.phone || "+62 895-2786-2303",
    email: contactData?.email || "ss.sulteng@gmail.com",
    mapsUrl: contactData?.mapsUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.753678733527!2d106.83786007499097!3d-6.296052993693026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f21077755555%3A0x7775555577755555!2sJl.%20Tj.%20Mas%20Utama%20No.44%2C%20RT.2%2FRW.1%2C%20Tj.%20Bar.%2C%20Kec.%20Jagakarsa%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2012530!5e0!3m2!1sid!2sid!4v1703666666666!5m2!1sid!2sid" 
  };

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      
      {/* HEADER BACKGROUND */}
      <div className="bg-[#1e2338] h-[500px] w-full absolute top-0 left-0 z-0">
        <div className="w-full h-full bg-[#1e2338] opacity-90 absolute top-0 left-0"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20">
        
        {/* JUDUL HALAMAN */}
        <div className="text-center text-white mb-16 pt-10">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-md">Hubungi Kami</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">Kami siap membantu kebutuhan legalitas bisnis Anda dengan pelayanan terbaik dan terpercaya.</p>
        </div>

        {/* GRID CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* KARTU INFORMASI (Kiri) */}
            <div className="lg:col-span-1 bg-white rounded-2xl shadow-2xl p-8 border-t-8 border-[#4ade80] flex flex-col h-full relative z-20">
                
                {/* Header Kabupaten / Judul */}
                <h2 className="text-xl font-extrabold text-[#1e2338] mb-6 uppercase tracking-wide border-b border-gray-100 pb-4">
                    {data.title}
                </h2>

                {/* Bagian Alamat */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2 text-[#1e2338]">
                         <FaMapMarkerAlt className="text-[#4ade80] text-lg" />
                         <h3 className="text-lg font-bold">Alamat :</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm pl-7 whitespace-pre-line">
                        {data.address}
                    </p>
                </div>

                {/* Bagian Hubungi */}
                <div className="mt-auto">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2 pl-7">
                        Hubungi :
                    </h3>
                    <Link 
                        href={`https://wa.me/${data.phone.replace(/[^0-9]/g, '')}?text=Halo,%20saya%20ingin%20konsultasi%20mengenai%20legalitas.`}
                        target="_blank"
                        className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3.5 px-6 rounded-full shadow-lg transition-all transform hover:-translate-y-1 group"
                    >
                        <FaWhatsapp className="text-2xl group-hover:scale-110 transition" />
                        <span>Hubungi Kami</span>
                    </Link>
                </div>
            </div>

            {/* PETA LOKASI (Kanan) */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 h-[450px] lg:h-auto relative z-20 min-h-[400px]">
                <iframe 
                    src={data.mapsUrl} 
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

      </div>
    </main>
  );
}