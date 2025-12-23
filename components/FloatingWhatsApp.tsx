import { FaWhatsapp } from 'react-icons/fa';

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/6285210852131?text=Halo%20Admin%20Solusi%20Sertifikat,%20saya%20tertarik%20untuk%20konsultasi."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-5 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group border-2 border-white"
      style={{ boxShadow: '0 4px 14px rgba(0,0,0,0.25)' }}
    >
      {/* Icon WA */}
      <FaWhatsapp className="text-2xl" />
      
      {/* Teks Hubungi Kami */}
      <span className="font-bold text-sm tracking-wide">Hubungi Kami</span>

      {/* Efek Notifikasi (Titik Merah Berdenyut) */}
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border border-white"></span>
      </span>
    </a>
  );
}