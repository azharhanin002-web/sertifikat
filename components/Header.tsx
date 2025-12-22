import Link from 'next/link';
import Image from 'next/image';
import { 
  FaPhoneAlt, FaEnvelope, FaRegClock, FaFacebookF, 
  FaInstagram, FaLinkedinIn, FaYoutube, FaChevronDown 
} from 'react-icons/fa';

export default function Header() {
  return (
    <>
      {/* TOP BAR */}
      <div className="bg-[#1e2338] text-white text-xs md:text-[13px] py-2">
        <div className="w-full px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-2">
           <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <FaRegClock className="text-white"/>
                <span className="font-medium">Senin, 22 Des 2025</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhoneAlt className="text-[#4ade80]"/>
                <span className="text-[#4ade80] font-bold">+62 895-2786-2303</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-[#4ade80]"/>
                <span className="text-[#4ade80] font-bold">ss.sulteng@gmail.com</span>
              </div>
           </div>
           <div className="hidden md:flex space-x-3 text-gray-400"></div>
        </div>
      </div>

      {/* NAVBAR */}
      <header className="bg-white/70 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all border-b border-white/20">
        <div className="w-full px-4 md:px-8 py-3 flex justify-between items-center">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center">
             <Image 
               src="/logo-solusi.png" 
               alt="PT Solusi Sertifikasi Sulteng" 
               width={300} 
               height={100} 
               className="h-14 md:h-16 w-auto object-contain" 
               priority 
             />
          </Link>
          
          {/* MENU */}
          <nav className="hidden lg:flex items-center text-sm md:text-[15px] font-bold text-gray-700 space-x-1">
            <Link href="/" className="hover:text-green-600 px-3 py-2">BERANDA</Link>
            <span className="text-gray-300">|</span>
            
            {/* LAYANAN DROPDOWN */}
            <div className="relative group">
                <button className="flex items-center hover:text-green-600 px-3 py-2 group-hover:text-green-600">
                    LAYANAN <FaChevronDown className="ml-1 text-[10px] opacity-70" />
                </button>
                {/* Lebar ditambah jadi w-80 agar muat font besar */}
                <div className="absolute top-full left-0 w-80 bg-[#1e2338] shadow-2xl rounded-b-lg border-t-4 border-green-500 hidden group-hover:block transition-all duration-300 z-50">
                    <div className="px-6 py-4 border-b border-gray-600/50">
                        <span className="text-xs font-extrabold text-[#4ade80] uppercase tracking-widest mb-3 block opacity-80">Pendirian & Perubahan</span>
                        
                        {/* FONT DIPERBESAR JADI text-base (16px) */}
                        <Link href="/layanan/pendirian-cv" className="block text-white hover:text-[#4ade80] text-base font-bold py-2 transition">Pendirian / Perubahan CV</Link>
                        <Link href="/layanan/pendirian-pt" className="block text-white hover:text-[#4ade80] text-base font-bold py-2 transition">Pendirian / Perubahan PT</Link>
                        <Link href="/layanan/pendirian-pt-perorangan" className="block text-white hover:text-[#4ade80] text-base font-bold py-2 transition">PT Perorangan</Link>
                    </div>
                    <div className="px-6 py-4 border-b border-gray-600/50">
                        <span className="text-xs font-extrabold text-[#4ade80] uppercase tracking-widest mb-3 block opacity-80">Konstruksi</span>
                        <Link href="/layanan/sbu-konstruksi" className="block text-white hover:text-[#4ade80] text-base font-bold py-2 transition">SBU Konstruksi</Link>
                        <Link href="/layanan/skk-konstruksi" className="block text-white hover:text-[#4ade80] text-base font-bold py-2 transition">SKK Konstruksi</Link>
                    </div>
                    <div className="px-6 py-4">
                        <span className="text-xs font-extrabold text-[#4ade80] uppercase tracking-widest mb-3 block opacity-80">Kelistrikan</span>
                        <Link href="/layanan/skttk" className="block text-white hover:text-[#4ade80] text-base font-bold py-2 transition">SKTTK (SERKOM)</Link>
                        <Link href="/layanan/sbujptl" className="block text-white hover:text-[#4ade80] text-base font-bold py-2 transition">SBUJPTL</Link>
                        <Link href="/layanan/iujptl" className="block text-white hover:text-[#4ade80] text-base font-bold py-2 transition">IUJPTL</Link>
                    </div>
                </div>
            </div>
            <span className="text-gray-300">|</span>
            
            {/* PROMO DROPDOWN */}
            <div className="relative group">
                <button className="flex items-center hover:text-green-600 px-3 py-2 group-hover:text-green-600">
                    PROMO <FaChevronDown className="ml-1 text-[10px] opacity-70" />
                </button>
                <div className="absolute top-full left-0 w-72 bg-[#1e2338] shadow-2xl rounded-b-lg border-t-4 border-green-500 hidden group-hover:block transition-all duration-300 z-50">
                    <div className="py-3">
                        {/* FONT DIPERBESAR JADI text-base */}
                        <Link href="/promo/cv-konstruksi" className="block px-6 py-2.5 text-base font-bold text-white hover:bg-white/5 hover:text-[#4ade80] border-b border-gray-600/30 transition">Pembuatan CV Konstruksi</Link>
                        <Link href="/promo/npwp" className="block px-6 py-2.5 text-base font-bold text-white hover:bg-white/5 hover:text-[#4ade80] border-b border-gray-600/30 transition">Pembuatan NPWP</Link>
                        <Link href="/promo/nib" className="block px-6 py-2.5 text-base font-bold text-white hover:bg-white/5 hover:text-[#4ade80] border-b border-gray-600/30 transition">Pembuatan NIB</Link>
                        <Link href="/promo/oss" className="block px-6 py-2.5 text-base font-bold text-white hover:bg-white/5 hover:text-[#4ade80] transition">Sertifikat Standart OSS</Link>
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
                <div className="absolute top-full left-0 w-56 bg-[#1e2338] shadow-2xl rounded-b-lg border-t-4 border-green-500 hidden group-hover:block transition-all duration-300 z-50">
                    <div className="py-3">
                        <Link href="/dokumen/legalitas" className="block px-6 py-2.5 text-base font-bold text-white hover:bg-white/5 hover:text-[#4ade80] border-b border-gray-600/30 transition">Legalitas</Link>
                        <Link href="/dokumen/kbli-2020" className="block px-6 py-2.5 text-base font-bold text-white hover:bg-white/5 hover:text-[#4ade80] transition">KBLI 2020</Link>
                    </div>
                </div>
            </div>
            <span className="text-gray-300">|</span>

            <Link href="/berita" className="hover:text-green-600 px-3 py-2">BERITA</Link>
            <span className="text-gray-300">|</span>

            <Link href="/testimoni" className="hover:text-green-600 px-3 py-2">TESTIMONI</Link>
          </nav>

          {/* SOSMED */}
          <div className="hidden md:flex items-center space-x-2">
             <a href="#" className="h-9 w-9 bg-gray-100/80 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition transform hover:scale-110 shadow-sm backdrop-blur-sm" title="Facebook"><FaFacebookF className="text-sm" /></a>
             <a href="#" className="h-9 w-9 bg-gray-100/80 rounded-full flex items-center justify-center text-gray-600 hover:bg-pink-600 hover:text-white transition transform hover:scale-110 shadow-sm backdrop-blur-sm" title="Instagram"><FaInstagram className="text-sm" /></a>
             <a href="#" className="h-9 w-9 bg-gray-100/80 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition transform hover:scale-110 shadow-sm backdrop-blur-sm" title="YouTube"><FaYoutube className="text-sm" /></a>
             <a href="#" className="h-9 w-9 bg-gray-100/80 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-800 hover:text-white transition transform hover:scale-110 shadow-sm backdrop-blur-sm" title="LinkedIn"><FaLinkedinIn className="text-sm" /></a>
          </div>

        </div>
      </header>
    </>
  );
}