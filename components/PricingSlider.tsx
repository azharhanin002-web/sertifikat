"use client";

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';

// Import CSS Swiper (Wajib)
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

export default function PricingSlider() {
  
  // Data Kartu (Bisa ditambah sampai puluhan)
  const pricingData = [
    { title: "Sertifikasi ISO 50001:2011", price: "Rp 30jt", image: "/ISO41K-600x450.png", features: ["Free Konsultasi Sertifikasi", "Sertifikat ISO 50001:2011", "Audit Report", "Pengerjaan Seluruh Indonesia"] },
    { title: "Sertifikasi ISO 55001:2024", price: "Rp 25jt", image: "/ISO50K-600x450.png", features: ["Free Konsultasi Sertifikasi", "Sertifikat ISO 55001:2024", "Audit Report", "Pengerjaan Seluruh Indonesia"] },
    { title: "Sertifikasi ISO 22301:2019", price: "Rp 19jt", image: "/ISO55K-600x450.png", features: ["Free Konsultasi Sertifikasi", "Sertifikat ISO 22301:2019", "Audit Report", "Pengerjaan Seluruh Indonesia"] },
    { title: "Sertifikasi ISO 41001:2018", price: "Rp 25jt", image: "/ISO223K-600x450.png", features: ["Free Konsultasi Sertifikasi", "Sertifikat ISO 41001:2018", "Audit Report", "Pengerjaan Seluruh Indonesia"] },
    // Tambahkan data dummy biar banyak untuk tes scroll
    { title: "SMK3 Kemnaker", price: "Rp 15jt", image: "/Slide7-768x585.png", features: ["Sertifikasi K3 Umum", "Audit Internal", "Laporan Kegiatan", "Resmi Kemnaker RI"] },
    { title: "SBU Konstruksi", price: "Rp 3.5jt", image: "/Slide12-768x585.png", features: ["SBU PUPR", "KTA Asosiasi", "Layanan Kilat", "Terakreditasi LPJK"] },
    { title: "Izin Usaha JPTL", price: "Rp 10jt", image: "/Slide12-768x585.png", features: ["Izin Usaha Penyedia", "Tenaga Listrik", "Wilayah Usaha", "Rekomendasi Teknis"] },
  ];

  return (
    <div className="w-full">
      <Swiper
        slidesPerView={1.2} // Di HP kelihatan 1 kartu lebih dikit
        spaceBetween={20}   // Jarak antar kartu
        freeMode={true}     // MODE PENTING: Agar bisa didrag bebas (lempar)
        grabCursor={true}   // Kursor berubah jadi tangan (grab)
        breakpoints={{
          640: { slidesPerView: 2.2, spaceBetween: 20 }, // Tablet
          1024: { slidesPerView: 3.5, spaceBetween: 30 }, // Laptop (3.5 kartu terlihat)
          1280: { slidesPerView: 4.5, spaceBetween: 30 }, // Layar Besar
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper pb-12 px-4" // Padding bawah untuk bayangan
      >
        {pricingData.map((item, index) => (
          <SwiperSlide key={index} className="h-auto">
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col relative group overflow-hidden">
                
                {/* Garis aksen di kiri (mirip contoh) */}
                <div className="absolute top-6 left-0 w-1 h-12 bg-black rounded-r-lg"></div>

                <div className="mb-6 pl-4">
                    <h3 className="text-gray-500 text-sm font-medium mb-1">{item.title}</h3>
                    <div className="flex items-start">
                        <span className="text-xs bg-black text-white rounded-full px-2 py-0.5 mr-2 mt-2 font-bold">Rp</span>
                        <span className="text-5xl font-extrabold text-gray-900 tracking-tighter">{item.price.replace('Rp ','').replace('jt','')}</span>
                        <div className="flex flex-col ml-1 mt-1">
                            <span className="text-xl font-bold text-gray-900 leading-none">jt</span>
                            <span className="text-[10px] text-gray-400 italic">basic price</span>
                        </div>
                    </div>
                </div>

                {/* Gambar Tengah */}
                <div className="relative h-48 w-full bg-gradient-to-b from-gray-50 to-white rounded-xl mb-6 flex items-center justify-center border border-gray-100 p-2">
                   <Image 
                     src={item.image} 
                     alt={item.title} 
                     width={200} 
                     height={300}
                     className="object-contain h-full w-auto drop-shadow-xl group-hover:scale-105 transition duration-500"
                   />
                </div>

                {/* Tombol */}
                <button className="block w-full py-3 rounded-xl border-2 border-gray-900 text-gray-900 font-bold text-sm text-center hover:bg-gray-900 hover:text-white transition mb-6">
                    Contact Us
                </button>

                {/* List Fitur */}
                <div className="space-y-2 border-t border-gray-100 pt-4 mt-auto">
                  <p className="text-xs text-gray-400 mb-2 font-medium">Detail paket harga</p>
                  {item.features.map((feature, i) => (
                    <div key={i} className="flex items-start text-xs text-gray-600">
                        <span className="mr-2 text-orange-400 font-bold text-lg leading-none">›</span>
                        {feature}
                    </div>
                  ))}
                </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}