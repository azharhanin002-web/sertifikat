import Image from 'next/image';
import Link from 'next/link'; 
import { 
  FaPhoneAlt, FaEnvelope, FaRegClock, FaFacebookF, 
  FaInstagram, FaLinkedinIn, FaYoutube 
} from 'react-icons/fa';

// 1. IMPORT VISITOR COUNTER
import VisitorCounter from './VisitorCounter'; 

export default function Footer() {
  return (
    <footer className="bg-[#1e2338] text-gray-400 py-16 font-sans">
        {/* UPDATE: Gunakan grid-cols-5 di layar besar agar muat untuk Widget Counter */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* KOLOM 1: LOGO & DESKRIPSI & MEDSOS */}
            <div className="lg:col-span-1">
                <div className="flex items-center mb-6">
                    <Image 
                       src="/logo-solusi.png" 
                       alt="Workshop Legalitas" 
                       width={240} 
                       height={80} 
                       className="h-14 w-auto object-contain brightness-0 invert opacity-90" 
                    />
                </div>
                
                <p className="text-sm leading-relaxed mb-6 text-gray-400">
                    Kami adalah mitra terpercaya Anda dalam mengurus segala kebutuhan legalitas.
                </p>
                
                {/* --- BAGIAN MEDSOS --- */}
                <div className="flex space-x-2">
                    <a 
                      href="https://www.facebook.com/profile.php?id=61584794602126" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="h-9 w-9 bg-[#2d334c] rounded flex items-center justify-center hover:bg-blue-600 hover:text-white transition cursor-pointer"
                    >
                        <FaFacebookF className="text-xs"/>
                    </a>
                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="h-9 w-9 bg-[#2d334c] rounded flex items-center justify-center hover:bg-pink-600 hover:text-white transition cursor-pointer"
                    >
                        <FaInstagram className="text-xs"/>
                    </a>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="h-9 w-9 bg-[#2d334c] rounded flex items-center justify-center hover:bg-blue-800 hover:text-white transition cursor-pointer"
                    >
                        <FaLinkedinIn className="text-xs"/>
                    </a>
                    <a 
                      href="https://youtube.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="h-9 w-9 bg-[#2d334c] rounded flex items-center justify-center hover:bg-red-600 hover:text-white transition cursor-pointer"
                    >
                        <FaYoutube className="text-xs"/>
                    </a>
                </div>
            </div>

            {/* KOLOM 2: LAYANAN */}
            <div>
                <h4 className="text-white font-bold mb-6 text-lg">Layanan</h4>
                <ul className="space-y-3 text-sm">
                    <li><Link href="/layanan/pendirian-pt" className="hover:text-white transition block py-1">Pendirian PT</Link></li>
                    <li><Link href="/layanan/sbu-konstruksi" className="hover:text-white transition block py-1">SBU Konstruksi</Link></li>
                    <li><Link href="/layanan/sertifikasi-iso" className="hover:text-white transition block py-1">Sertifikasi ISO</Link></li>
                    <li><Link href="/layanan/perubahan-akta-pt-atau-cv" className="hover:text-white transition block py-1">Perubahan Akta</Link></li>
                </ul>
            </div>

            {/* KOLOM 3: TAUTAN */}
            <div>
                <h4 className="text-white font-bold mb-6 text-lg">Tautan</h4>
                <ul className="space-y-3 text-sm">
                    <li><Link href="/tentang-kami" className="hover:text-white transition block py-1">Tentang Kami</Link></li>
                    <li><Link href="/kontak" className="hover:text-white transition block py-1">Hubungi Kami</Link></li>
                    <li><Link href="/berita" className="hover:text-white transition block py-1">Blog & Berita</Link></li>
                    <li><Link href="/daftar-klien" className="hover:text-white transition block py-1">Daftar Klien</Link></li>
                </ul>
            </div>

            {/* KOLOM 4: KONTAK */}
            <div>
                <h4 className="text-white font-bold mb-6 text-lg">Hubungi</h4>
                <ul className="space-y-4 text-sm">
                    <li className="flex items-start">
                        <FaPhoneAlt className="mt-1 mr-3 text-[#4ade80] flex-shrink-0" />
                        <span>+62 895-2786-2303</span>
                    </li>
                    <li className="flex items-start">
                        <FaEnvelope className="mt-1 mr-3 text-[#4ade80] flex-shrink-0" />
                        <span className="break-all">ss.sulteng@gmail.com</span>
                    </li>
                    <li className="flex items-start">
                        <FaRegClock className="mt-1 mr-3 text-[#4ade80] flex-shrink-0" />
                        <span>08.00 - 17.00 WIB</span>
                    </li>
                </ul>
            </div>

            {/* KOLOM 5: STATISTIK PENGUNJUNG (SUDAH DIPASANG) */}
            <div className="md:col-span-2 lg:col-span-1 mt-8 lg:mt-0">
                <VisitorCounter />
            </div>

        </div>

        {/* COPYRIGHT */}
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-[#2d334c] text-center text-xs text-gray-500">
            <p>© {new Date().getFullYear()} www.solusi-sertifikat.com. All Rights Reserved.</p>
        </div>
    </footer>
  );
}