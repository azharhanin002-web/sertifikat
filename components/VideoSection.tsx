"use client";

import { useState } from 'react';
import Image from 'next/image';
import { FaPlay, FaTimes } from 'react-icons/fa';

export default function VideoSection({ videos }: { videos: any[] }) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  // Fungsi helper untuk mengambil ID Youtube dari URL
  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {videos.map((item: any, index: number) => (
          <div 
            key={index} 
            className="group relative h-72 rounded-xl overflow-hidden cursor-pointer shadow-lg"
            onClick={() => setVideoUrl(item.youtubeUrl)} // KLIK DISINI BUKA POPUP
          >
            {/* Thumbnail */}
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center font-bold text-gray-400">
                {item.thumb ? (
                <Image src={item.thumb} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-105"/>
                ) : (
                "VIDEO THUMBNAIL"
                )}
            </div>

            {/* Overlay Play Button */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition">
                <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                    <FaPlay className="text-[#1e2338] ml-1" />
                </div>
            </div>

            {/* Judul di Bawah */}
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL VIDEO PLAYER */}
      {videoUrl && (
        <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setVideoUrl(null)}>
            <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
                {/* Tombol Close */}
                <button 
                    className="absolute -top-10 right-0 text-white hover:text-red-500 transition"
                    onClick={() => setVideoUrl(null)}
                >
                    <FaTimes className="text-3xl" />
                </button>

                {/* Youtube Iframe */}
                <iframe
                    src={`https://www.youtube.com/embed/${getYoutubeId(videoUrl)}?autoplay=1`}
                    title="YouTube video player"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
      )}
    </>
  );
}