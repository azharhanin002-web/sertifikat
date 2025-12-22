import Link from 'next/link';
import Image from 'next/image';
import { 
  FaPhoneAlt, FaEnvelope, FaRegClock, FaFacebookF, 
  FaInstagram, FaLinkedinIn, FaYoutube, FaChevronDown 
} from 'react-icons/fa';

export default function Header() {
  return (
    <>
      {/* TOP BAR (Data Disesuaikan dengan PT Solusi Sertifikasi Sulteng) */}
      <div className="bg-[#1e2338] text-white text-[11px] md:text-xs py-2 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
           <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2"><FaRegClock className="text-white"/><span className="font-medium">Senin - Jumat (08:00 - 17:00)</span></div>
              {/* Nomor HP dari Screenshot */}
              <div className="flex items-center space-x-2"><FaPhoneAlt className="text-[#4ade80]"/><span className="text-[#4ade80] font-bold">+62 895-2786-2303</span></div>
              {/* Email dari Screenshot */}
              <div className="flex items-center space-x-2"><FaEnvelope className="text-[#4ade80]"/><span className="text-[#4ade80] font-bold">ss.sulteng@gmail.com</span></div>
           </div>
           <div className="hidden md:flex space-x-3 text-gray-400"></div>
        </div>
      </div>

      {/* NAVBAR (Sticky & Shadow) */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          
          {/* LOGO IMAGE */}
          <Link href="/" className="flex items-center">
             <Image 
               src="/logo-solusi.png" 
               alt="PT Solusi Sertifikasi Sulteng" 
               width={300} 
               height={100} 
               className="h-12 md:h-16 w-auto object-contain" // Ukuran disesuaikan agar proporsional
               priority 
             />
          </Link>
          
          <nav className="hidden lg:flex items-center text-xs md:text-sm font-bold text-gray-700 space-x-1">
            <Link href="/" className="hover:text-green-600 px-3 py-2">BERANDA</Link>
            <span className="text-gray-300">|</span>
            
            {/* LAYANAN DROPDOWN */}
            <div className="relative group">
                <button className="flex items-center hover:text-green-600 px-3 py-2 group-hover:text-green-600">
                    LAYANAN <FaChevronDown className="ml-1 text-[10px] opacity-70" />
                </button>
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-b-lg border-t-4 border-green-500 hidden group-hover:block transition-all duration-300 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                        <span className="text-xs font-extrabold text-blue-900 uppercase tracking-wider mb-2 block">Pendirian & Perubahan</span>
                        <Link href="/layanan/pendirian-cv" className="block text-gray-600 hover:text-green-600 text-xs py-1">Pendirian / Perubahan CV</Link>
                        <Link href="/layanan/pendirian-pt" className="block text-gray-600 hover:text-green-600 text-xs py-1">Pendirian / Perubahan PT</Link>
                        <Link href="/layanan/pendirian-pt-perorangan" className="block text-gray-600 hover:text-green-600 text-xs py-1">PT Perorangan</Link>
                    </div>
                    <div className="px-4 py-3 border-b border-gray-100">
                        <span className="text-xs font-extrabold text-blue-900 uppercase tracking-wider mb-2 block">Konstruksi</span>
                        <Link href="/layanan/sbu-konstruksi" className="block text-gray-600 hover:text-green-600 text-xs py-1">SBU Konstruksi</Link>
                        <Link href="/layanan/skk-konstruksi" className="block text-gray-600 hover:text-green-600 text-xs py-1">SKK Konstruksi</Link>
                    </div>
                    <div className="px-4 py-3">
                        <span className="text-xs font-extrabold text-blue-900 uppercase tracking-wider mb-2 block">Kelistrikan</span>
                        <Link href="/layanan/skttk" className="block text-gray-600 hover:text-green-600 text-xs py-1">SKTTK (SERKOM)</Link>
                        <Link href="/layanan/sbujptl" className="block text-gray-600 hover:text-green-600 text-xs py-1">SBUJPTL</Link>
                        <Link href="/layanan/iujptl" className="block text-gray-600 hover:text-green-600 text-xs py-1">IUJPTL</Link>
                    </div>
                </div>
            </div>
            <span className="text-gray-300">|</span>
            
            {/* PROMO DROPDOWN */}
            <div className="relative group">
                <button className="flex items-center hover:text-green-600 px-3 py-2 group-hover:text-green-600">
                    PROMO <FaChevronDown className="ml-1 text-[10px] opacity-70" />
                </button>
                <div className="absolute top-full left-0 w-60 bg-white shadow-xl rounded-b-lg border-t-4 border-green-500 hidden group-hover:block transition-all duration-300 z-50">
                    <div className="py-2">
                        <Link href="/promo/cv-konstruksi" className="block px-4 py-2 text-xs text-gray-600 hover:bg-gray-50 hover:text-green-600 border-b border-gray-50">Pembuatan CV Konstruksi</Link>
                        <Link href="/promo/npwp" className="block px-4 py-2 text-xs text-gray-600 hover:bg-gray-50 hover:text-green-600 border-b border-gray-50">Pembuatan NPWP</Link>
                        <Link href="/promo/nib" className="block px-4 py-2 text-xs text-gray-600 hover:bg-gray-50 hover:text-green-600 border-b border-gray-50">Pembuatan NIB</Link>
                        <Link href="/promo/oss" className="block px-4 py-2 text-xs text-gray-600 hover:bg-gray-50 hover:text-green-600 border-b border-gray-50">Sertifikat Standart OSS</Link>
                    </div>
                </div>
            </div>
            <span className="text-gray-300">|</span>

            <Link href="/kontak" className="hover:text-green-600 px-3 py-2">KONTAK</Link>
            <span className="text-gray-300">|</span>

            {/* DOKUMEN DROPDOWN */}
            <div className="relative group">
                <button className="flex items-center hover:text-green-600 px-3 py-2 group-hover:text-green-600">
                    DOKUMEN <FaChevronDown className="ml-1 text-[10px] opacity-70" />
                </button>
                <div className="absolute top-full left-0 w-40 bg-white shadow-xl rounded-b-lg border-t-4 border-green-500 hidden group-hover:block transition-all duration-300 z-50">
                    <div className="py-2">
                        <Link href="/dokumen/legalitas" className="block px-4 py-2 text-xs text-gray-600 hover:bg-gray-50 hover:text-green-600 border-b border-gray-50">Legalitas</Link>
                        <Link href="/dokumen/kbli-2020" className="block px-4 py-2 text-xs text-gray-600 hover:bg-gray-50 hover:text-green-600">KBLI 2020</Link>
                    </div>
                </div>
            </div>
            <span className="text-gray-300">|</span>

            <Link href="/berita" className="hover:text-green-600 px-3 py-2">BERITA</Link>
            <span className="text-gray-300">|</span>

            <Link href="/testimoni" className="hover:text-green-600 px-3 py-2">TESTIMONI</Link>
          </nav>

          {/* TOMBOL SOSMED */}
          <div className="hidden md:flex items-center space-x-2">
             <a href="#" className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition transform hover:scale-110 shadow-sm" title="Facebook"><FaFacebookF className="text-sm" /></a>
             <a href="#" className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-pink-600 hover:text-white transition transform hover:scale-110 shadow-sm" title="Instagram"><FaInstagram className="text-sm" /></a>
             <a href="#" className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition transform hover:scale-110 shadow-sm" title="YouTube"><FaYoutube className="text-sm" /></a>
             <a href="#" className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-800 hover:text-white transition transform hover:scale-110 shadow-sm" title="LinkedIn"><FaLinkedinIn className="text-sm" /></a>
          </div>

        </div>
      </header>
    </>
  );
}