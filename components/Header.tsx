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
      {/* === TOP BAR (HITAM) === */}
      {/* Container Full Width */}
      <div className="bg-[#1e2338] text-white text-xs py-2 transition-all z-50 relative">
        <div className="w-full px-4 md:px-8 flex justify-start md:justify-between items-center gap-4 md:gap-0">
           
           {/* KIRI: Jam / Tanggal */}
           <div className="flex items-center space-x-2">
              <FaRegClock className="text-[#fca311]"/>
              <span className="font-medium truncate">{currentDate || "..."}</span>
           </div>

           {/* KANAN: Kontak */}
           <div className="flex items-center">
              {/* Tampilan Desktop: Teks Lengkap (Rata Kanan) */}
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

              {/* Tampilan Mobile: Ikon Hijau (Geser ke Kiri dekat tanggal) */}
              <div className="flex md:hidden gap-4 items-center ml-4 pl-4 border-l border-gray-600">
                  <a href="tel:+6289527862303" className="text-[#4ade80] hover:text-white transition">
                    <FaPhoneAlt className="text-sm" />
                  </a>
                  <a href="mailto:ss.sulteng@gmail.com" className="text-[#4ade80] hover:text-white transition">
                    <FaEnvelope className="text-sm" />
                  </a>
              </div>
           </div>
        </div>
      </div>

      {/* === NAVBAR (PUTIH & EFEK KACA) === */}
      {/* Kembali ke bg-white/70 agar lebih transparan (tipis) dan w-full agar full size */}
      <header className="bg-white/70 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-white/20 transition-all">
        <div className="w-full px-4 md:px-8 py-3 flex justify-between items-center">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center">
             <Image 
               src="/logo-solusi.png" 
               alt="Logo" 
               width={280} 
               height={90} 
               className="h-14 md:h-16 w-auto object-contain" 
               priority 
             />
          </Link>
          
          {/* MENU DESKTOP */}
          <nav className="hidden lg:flex items-center text-[13px] font-bold text-gray-700 space-x-1 uppercase tracking-wide">
            <Link href="/" className="hover:text-green-600 px-3 py-2">Beranda</Link>
            <span className="text-gray-300">|</span>
            <div className="relative group">
                <Link href="/layanan" className="flex items-center hover:text-green-600 px-3 py-2 group-hover:text-green-600 cursor-pointer">
                    Layanan <FaChevronDown className="ml-1 text-[10px] opacity-70" />
                </Link>
                <div className="absolute top-full left-0 w-64 bg-[#1e2338] shadow-2xl rounded-b-lg border-t-4 border-green-500 hidden group-hover:block transition-all duration-300 z-50">
                    <div className="py-2">
                        <Link href="/layanan/pendirian-cv" className="block px-6 py-2 text-white hover:text-[#4ade80] border-b border-gray-700/50">Pendirian CV</Link>
                        <Link href="/layanan/pendirian-pt" className="block px-6 py-2 text-white hover:text-[#4ade80] border-b border-gray-700/50">Pendirian PT</Link>
                        <Link href="/layanan/sbu-konstruksi" className="block px-6 py-2 text-white hover:text-[#4ade80]">SBU Konstruksi</Link>
                    </div>
                </div>
            </div>
            <span className="text-gray-300">|</span>
            <div className="relative group">
                <Link href="/promo" className="flex items-center hover:text-green-600 px-3 py-2 group-hover:text-green-600 cursor-pointer">
                    Promo <FaChevronDown className="ml-1 text-[10px] opacity-70" />
                </Link>
                <div className="absolute top-full left-0 w-64 bg-[#1e2338] shadow-2xl rounded-b-lg border-t-4 border-green-500 hidden group-hover:block transition-all duration-300 z-50">
                    <div className="py-2">
                        <Link href="/promo/nib" className="block px-6 py-2 text-white hover:text-[#4ade80]">Pembuatan NIB</Link>
                    </div>
                </div>
            </div>
            <span className="text-gray-300">|</span>
            <Link href="/kontak" className="hover:text-green-600 px-3 py-2">Kontak</Link>
            <span className="text-gray-300">|</span>
            <Link href="/dokumen" className="hover:text-green-600 px-3 py-2">Dokumen</Link>
            <span className="text-gray-300">|</span>
            <Link href="/berita" className="hover:text-green-600 px-3 py-2">Berita</Link>
          </nav>

          {/* SOSMED (Desktop Only) */}
          <div className="hidden lg:flex items-center space-x-2 ml-4">
              <a href="#" className="h-8 w-8 bg-gray-100/80 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition"><FaFacebookF className="text-xs" /></a>
              <a href="#" className="h-8 w-8 bg-gray-100/80 rounded-full flex items-center justify-center text-gray-600 hover:bg-pink-600 hover:text-white transition"><FaInstagram className="text-xs" /></a>
              <a href="#" className="h-8 w-8 bg-gray-100/80 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-800 hover:text-white transition"><FaLinkedinIn className="text-xs" /></a>
          </div>

          {/* TOMBOL MOBILE (KANAN) */}
          <div className="flex items-center gap-3 lg:hidden">
              {/* Tombol Telepon Mobile */}
              <a href="tel:+6289527862303" className="bg-[#1e2338] text-white p-2.5 rounded-md hover:bg-blue-900 transition shadow-sm flex items-center justify-center">
                  <FaPhoneAlt className="text-sm" />
              </a>
              {/* Tombol Menu Mobile */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="bg-[#1e2338] text-white p-2.5 rounded-md hover:bg-blue-900 transition shadow-sm flex items-center justify-center"
              >
                  {isMobileMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
              </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isMobileMenuOpen && (
            <div className="lg:hidden w-full bg-white shadow-xl border-t border-gray-100 absolute top-full left-0 h-screen overflow-y-auto pb-20 animate-fade-in-down z-50">
                <div className="flex flex-col p-6 space-y-4 font-bold text-[#1e2338]">
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-gray-100 pb-2 hover:text-green-600">BERANDA</Link>
                    <Link href="/layanan" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-gray-100 pb-2 hover:text-green-600">LAYANAN</Link>
                    <Link href="/promo" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-gray-100 pb-2 hover:text-green-600">PROMO</Link>
                    <Link href="/dokumen" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-gray-100 pb-2 hover:text-green-600">DOKUMEN</Link>
                    <Link href="/berita" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-gray-100 pb-2 hover:text-green-600">BERITA</Link>
                    <Link href="/kontak" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-gray-100 pb-2 hover:text-green-600">KONTAK</Link>
                </div>
            </div>
        )}
      </header>
    </>
  );
}