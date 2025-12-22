import Link from 'next/link';
import { getGallery } from '~/lib/sanity.client';
import GalleryGrid from '~/components/GalleryGrid'; // <--- Import Komponen Baru

// Auto update tiap 10 detik
export const revalidate = 10;

export default async function GalleryPage() {
  // Ambil semua data gallery dari Sanity (Server Side)
  const gallery = await getGallery();

  return (
    <main className="min-h-screen bg-white font-sans">
      
      {/* 1. HEADER HALAMAN */}
      <div className="bg-[#1e2338] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Galeri Kegiatan</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Dokumentasi aktivitas dan kegiatan terbaru dari tim kami.
            </p>
            
            {/* Breadcrumb */}
            <div className="mt-8 flex justify-center items-center space-x-2 text-sm text-gray-400">
                <Link href="/" className="hover:text-[#4ade80] transition">Beranda</Link>
                <span>/</span>
                <span className="text-[#4ade80] font-bold">Gallery</span>
            </div>
        </div>
      </div>

      {/* 2. GRID GALLERY (CLIENT COMPONENT) */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {gallery && gallery.length > 0 ? (
          // Data dikirim ke komponen client agar bisa diklik
          <GalleryGrid items={gallery} />
        ) : (
          // JIKA TIDAK ADA DATA
          <div className="text-center py-20">
             <div className="text-6xl mb-4">📷</div>
             <h3 className="text-2xl font-bold text-gray-400">Belum ada foto di galeri.</h3>
             <p className="text-gray-500 mt-2">Silakan tambahkan konten melalui Sanity Studio.</p>
          </div>
        )}
      </div>

    </main>
  );
}