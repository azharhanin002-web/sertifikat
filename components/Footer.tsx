import Image from 'next/image';
import { 
  FaPhoneAlt, FaEnvelope, FaRegClock, FaFacebookF, 
  FaInstagram, FaLinkedinIn, FaYoutube 
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#1e2338] text-gray-400 py-16 font-sans">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            
            {/* KOLOM 1: LOGO & DESKRIPSI */}
            <div>
                <div className="flex items-center mb-6">
                    <Image 
                       src="/logo-solusi.png" 
                       alt="Workshop Legalitas" 
                       width={240} // Diperbesar
                       height={80} 
                       className="h-14 w-auto object-contain brightness-0 invert opacity-90" // Tinggi diperbesar
                    />
                </div>
                
                {/* Font diperbesar jadi text-sm */}
                <p className="text-sm leading-relaxed mb-6 text-gray-400">
                    Kami adalah mitra terpercaya Anda dalam mengurus segala kebutuhan legalitas dan sertifikasi perusahaan.
                </p>
                
                <div className="flex space-x-3">
                    <div className="h-10 w-10 bg-[#2d334c] rounded flex items-center justify-center hover:bg-blue-600 hover:text-white transition cursor-pointer"><FaFacebookF className="text-sm"/></div>
                    <div className="h-10 w-10 bg-[#2d334c] rounded flex items-center justify-center hover:bg-pink-600 hover:text-white transition cursor-pointer"><FaInstagram className="text-sm"/></div>
                    <div className="h-10 w-10 bg-[#2d334c] rounded flex items-center justify-center hover:bg-blue-800 hover:text-white transition cursor-pointer"><FaLinkedinIn className="text-sm"/></div>
                    <div className="h-10 w-10 bg-[#2d334c] rounded flex items-center justify-center hover:bg-red-600 hover:text-white transition cursor-pointer"><FaYoutube className="text-sm"/></div>
                </div>
            </div>

            {/* KOLOM 2: LAYANAN */}
            <div>
                <h4 className="text-white font-bold mb-6 text-lg">Layanan Kami</h4> {/* Font Judul Diperbesar */}
                <ul className="space-y-3 text-sm"> {/* Font Isi Diperbesar */}
                    <li><a href="#" className="hover:text-white transition block py-1">Pendirian PT & CV</a></li>
                    <li><a href="#" className="hover:text-white transition block py-1">SBU Konstruksi</a></li>
                    <li><a href="#" className="hover:text-white transition block py-1">Sertifikasi ISO</a></li>
                    <li><a href="#" className="hover:text-white transition block py-1">SKUP Migas</a></li>
                </ul>
            </div>

            {/* KOLOM 3: TAUTAN */}
            <div>
                <h4 className="text-white font-bold mb-6 text-lg">Tautan Cepat</h4>
                <ul className="space-y-3 text-sm">
                    <li><a href="#" className="hover:text-white transition block py-1">Tentang Kami</a></li>
                    <li><a href="#" className="hover:text-white transition block py-1">Hubungi Kami</a></li>
                    <li><a href="#" className="hover:text-white transition block py-1">Blog & Berita</a></li>
                </ul>
            </div>

            {/* KOLOM 4: KONTAK */}
            <div>
                <h4 className="text-white font-bold mb-6 text-lg">Hubungi Kami</h4>
                <ul className="space-y-4 text-sm">
                    <li className="flex items-start">
                        <FaPhoneAlt className="mt-1 mr-3 text-[#4ade80]" />
                        <span>021-2787-4648 (Office)<br/><span className="text-white font-bold">0895-3243-83400 (WhatsApp)</span></span>
                    </li>
                    <li className="flex items-start">
                        <FaEnvelope className="mt-1 mr-3 text-[#4ade80]" />
                        <span>marketing@workshop-indonesia.com</span>
                    </li>
                    <li className="flex items-start">
                        <FaRegClock className="mt-1 mr-3 text-[#4ade80]" />
                        <span>Senin - Jumat: 08.00 - 17.00</span>
                    </li>
                </ul>
            </div>

        </div>

        {/* COPYRIGHT */}
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-[#2d334c] text-center text-xs text-gray-500">
            <p>© 2025 www.solusi-sertifikat.com. All Rights Reserved.</p>
        </div>
      </footer>
  );
}