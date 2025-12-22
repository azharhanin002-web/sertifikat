"use client";

import { useState } from 'react';
import Image from 'next/image';
import { FaTimes, FaSearchPlus } from 'react-icons/fa';

export default function GalleryGrid({ items }: { items: any[] }) {
  const [selectedImage, setSelectedImage] = useState<any>(null);

  return (
    <>
      {/* GRID GALLERY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item: any, index: number) => (
          <div 
            key={index} 
            className="group relative break-inside-avoid cursor-pointer"
            onClick={() => setSelectedImage(item)} // KLIK DISINI MEMBUKA MODAL
          >
            {/* Kartu Gambar */}
            <div className="relative h-64 w-full overflow-hidden rounded-xl bg-gray-100 shadow-md hover:shadow-xl transition-all duration-300">
                {item.image ? (
                  <Image 
                    src={item.image} 
                    alt={item.caption || 'Gallery Image'} 
                    fill 
                    className="object-cover group-hover:scale-110 transition duration-700 ease-in-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-bold">NO IMAGE</div>
                )}
                
                {/* Overlay Icon Zoom */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <FaSearchPlus className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-50 group-hover:scale-100" />
                </div>

                {/* Caption Kecil di Bawah */}
                {item.caption && (
                  <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white text-sm font-medium line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                )}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL / LIGHTBOX (POPUP) */}
      {selectedImage && (
        <div 
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-300"
            onClick={() => setSelectedImage(null)} // Klik background untuk tutup
        >
            {/* Tombol Close */}
            <button 
                className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition z-50"
                onClick={() => setSelectedImage(null)}
            >
                <FaTimes className="text-2xl" />
            </button>

            {/* Gambar Besar */}
            <div className="relative w-full max-w-5xl h-auto max-h-[85vh] aspect-video rounded-lg overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
                {selectedImage.image && (
                    <Image 
                        src={selectedImage.image} 
                        alt={selectedImage.caption || 'Zoomed Image'} 
                        fill 
                        className="object-contain"
                        quality={100}
                    />
                )}
            </div>

            {/* Caption Besar */}
            {selectedImage.caption && (
                <div className="absolute bottom-10 left-0 w-full text-center px-4">
                    <p className="text-white text-lg font-medium bg-black/50 inline-block px-6 py-2 rounded-full backdrop-blur-md">
                        {selectedImage.caption}
                    </p>
                </div>
            )}
        </div>
      )}
    </>
  );
}