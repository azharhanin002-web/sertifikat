"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaPhoneAlt, FaEnvelope, FaRegClock, FaFacebookF, 
  FaInstagram, FaLinkedinIn, FaYoutube, FaChevronDown, FaBars, FaTimes 
} from 'react-icons/fa';

export default function Header() {
  const [currentDate, setCurrentDate] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const dateStr = new Date().toLocaleDateString('id-ID', { 
        weekday: 'long', 
        day: 'numeric',   
        month: 'short',   
        year: 'numeric',  
        timeZone: 'Asia/Jakarta' 
    });
    setCurrentDate(dateStr);
  }, []);

  return (
    <>
      {/* === TOP BAR (HITAM KEBIRUAN) === */}
      <div className="bg-[#222244] text-white text-xs py-2.5 transition-all z-50 relative">
        <div className="w-full px-4 md:px-8 flex justify-start md:justify-between items-center gap-4">
           
           {/* KIRI: Jam / Tanggal */}
           <div className="flex items-center space-x-2 shrink-0">
              <FaRegClock className="text-[#fca311]"/>
              <span className="font-medium">{currentDate || "..."}</span>
           </div>

           {/* ICON KONTAK */}
           <div className="flex items-center gap-4 pl-2 md:pl-0 border-l border-gray-600 md:border-none">
              
              {/* TAMPILAN HP: Ikon Saja (Warna Hijau) */}
              <div className="flex md:hidden gap-4">
                  <a href="tel:+6289527862303" className="text-[#4ade80] hover:text-white transition">
                    <FaPhoneAlt className="text-sm" />
                  </a>
                  <a href="mailto:ss.sulteng@gmail.com" className="text-[#4ade80] hover:text-white transition">
                    <FaEnvelope className="text-sm" />
                  </a>
              </div>

              {/* TAMPILAN DESKTOP: Teks Lengkap */}
              <div className="hidden md:flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <FaPhoneAlt className="text-[#4ade80]"/>
                    <span className="font-bold">+62 895-2786-2303</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaEnvelope className="text-[#4ade80]"/>
                    <span className="font-bold">ss.sulteng@gmail.com</span>
                  </div>
              </div>
           </div>
        </div>
      </div>

      {/* === NAVBAR (EFEK KACA LEBIH TRANSPARAN) === */}
      {/* bg-white/30 = Transparan 30% */}
      {/* backdrop-blur-lg = Efek buram kaca kamar mandi */}
      <header className="bg-white/30 backdrop-blur-lg shadow-sm sticky top-0 z-40 border-b border-white/20 transition-all">
        <div className="w-full px-4 md:px-8 py-2 md:py-4 flex justify-between items-center">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center">
             <Image 
               src="/logo-solusi.png" 
               alt="Logo" 
               width={300} 
               height={100} 
               className="h-12 md:h-20 w-auto object-contain" 
               priority 
             />
          </Link>
          
          {/* MENU DESKTOP */}
          <nav className="hidden lg:flex items-center text-[13px] font-bold text-gray-800 space-x-1 uppercase tracking-wide">
            <Link href="/" className="hover:text-green-600 px-3 py-2">Beranda</Link>
            <span className="text-gray-400">|</span>
            
            {/* LAYANAN (Masih Dropdown) */}
            <div className="relative group">
                <Link href="/layanan" className="flex items-center hover:text-green-600 px-3 py-2 group-hover:text-green-600 cursor-pointer">
                    Layanan <FaChevronDown className="ml-1 text-[10px] opacity-70" />
                </Link>
                <div className="absolute top-full left-0 w-80 bg-[#222244] shadow-2xl rounded-b-lg border-t-4 border-green-500 hidden group-hover:block transition-all duration-300 z-50">
                    <div className="px-6 py-4 border-b border-gray-600/50">
                        <span className="text-xs font-extrabold text-[#4ade80] uppercase tracking-widest mb-3 block opacity-80">Pendirian & Perubahan</span>
                        <Link href="/layanan/pendirian-cv" className="block text-white hover:text-[#4ade80] text-sm font-bold py-1.5 transition">Pendirian / Perubahan CV</Link>
                        <Link href="/layanan/pendirian-pt" className="block text-white hover:text-[#4ade80] text-sm font-bold py-1.5 transition">Pendirian / Perubahan PT</Link>
                        <Link href="/layanan/pendirian-pt-perorangan" className="block text-white hover:text-[#4ade80] text-sm font-bold py-1.5 transition">PT Perorangan</Link>
                    </div>
                    <div className="px-6 py-4 border-b border-gray-600/50">
                        <span className="text-xs font-extrabold text-[#4ade80] uppercase tracking-widest mb-3 block opacity-80">Konstruksi</span>
                        <Link href="/layanan/sbu-konstruksi" className="block text-white hover:text-[#4ade80] text-sm font-bold py-1.5 transition">SBU Konstruksi</Link>
                        <Link href="/layanan/skk-konstruksi" className="block text-white hover:text-[#4ade80] text-sm font-bold py-1.5 transition">SKK Konstruksi</Link>
                    </div>
                    <div className="px-6 py-4">
                        <span className="text-xs font-extrabold text-[#4ade80] uppercase tracking-widest mb-3 block opacity-80">Kelistrikan</span>
                        <Link href="/layanan/skttk" className="block text-white hover:text-[#4ade80] text-sm font-bold py-1.5 transition">SKTTK (SERKOM)</Link>
                        <Link href="/layanan/sbujptl" className="block text-white hover:text-[#4ade80] text-sm font-bold py-1.5 transition">SBUJPTL</Link>
                        <Link href="/layanan/iujptl" className="block text-white hover:text-[#4ade80] text-sm font-bold py-1.5 transition">IUJPTL</Link>
                    </div>
                </div>
            </div>
            
            <span className="text-gray-400">|</span>
            
            {/* PROMO (Sudah Tidak Dropdown) */}
            <Link href="/promo" className="hover:text-green-600 px-3 py-2">Promo</Link>
            
            <span className="text-gray-400">|</span>
            <Link href="/kontak" className="hover:text-green-600 px-3 py-2">Kontak</Link>
            <span className="text-gray-400">|</span>
            
            {/* DOKUMEN (Sudah Tidak Dropdown) */}
            <Link href="/dokumen" className="hover:text-green-600 px-3 py-2">Dokumen</Link>
            
            <span className="text-gray-400">|</span>
            <Link href="/berita" className="hover:text-green-600 px-3 py-2">Berita</Link>
            <span className="text-gray-400">|</span>
            <Link href="/daftar-klien" className="hover:text-green-600 px-3 py-2">Klien Kami</Link>
          </nav>

          {/* SOSMED (Desktop Only) */}
          <div className="hidden lg:flex items-center space-x-2 ml-4">
              <a href="https://www.facebook.com/profile.php?id=61584794602126" className="h-8 w-8 bg-gray-100/80 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition"><FaFacebookF className="text-xs" /></a>
              <a href="#" className="h-8 w-8 bg-gray-100/80 rounded-full flex items-center justify-center text-gray-600 hover:bg-pink-600 hover:text-white transition"><FaInstagram className="text-xs" /></a>
              <a href="#" className="h-8 w-8 bg-gray-100/80 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-800 hover:text-white transition"><FaLinkedinIn className="text-xs" /></a>
          </div>

          {/* TOMBOL MOBILE (KANAN) */}
          <div className="flex items-center gap-3 lg:hidden">
              <a href="tel:+6289527862303" className="bg-[#222244] text-white p-2.5 rounded-md hover:bg-blue-900 transition shadow-sm flex items-center justify-center">
                  <FaPhoneAlt className="text-sm" />
              </a>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="bg-[#222244] text-white p-2.5 rounded-md hover:bg-blue-900 transition shadow-sm flex items-center justify-center"
              >
                  {isMobileMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
              </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isMobileMenuOpen && (
            <div className="lg:hidden w-full bg-white shadow-xl border-t border-gray-100 absolute top-full left-0 h-screen overflow-y-auto pb-20 animate-fade-in-down z-50">
                <div className="flex flex-col p-6 space-y-4 font-bold text-[#222244]">
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-gray-100 pb-2 hover:text-green-600">BERANDA</Link>
                    <Link href="/layanan" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-gray-100 pb-2 hover:text-green-600">LAYANAN</Link>
                    <Link href="/promo" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-gray-100 pb-2 hover:text-green-600">PROMO</Link>
                    <Link href="/dokumen" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-gray-100 pb-2 hover:text-green-600">DOKUMEN</Link>
                    <Link href="/berita" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-gray-100 pb-2 hover:text-green-600">BERITA</Link>
                    <Link href="/kontak" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-gray-100 pb-2 hover:text-green-600">KONTAK</Link>
					<Link href="/klien-kami" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-gray-100 pb-2 hover:text-green-600">Klien Kami</Link>
                </div>
            </div>
        )}
      </header>
    </>
  );
}