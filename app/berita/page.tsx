import Image from 'next/image';
import Link from 'next/link';
import { getPosts } from '~/lib/sanity.client';
import { FaCalendarAlt, FaFolder, FaSearch } from 'react-icons/fa';

// Auto update tiap 10 detik
export const revalidate = 10;

export default async function BeritaPage() {
  // Ambil SEMUA berita dari Sanity
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-white font-sans">
      
      {/* 1. HEADER HALAMAN (Sama seperti detail berita biar konsisten) */}
      <div className="bg-[#1e2338] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Berita & Artikel</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Informasi terbaru seputar regulasi, sertifikasi, dan dunia konstruksi.
            </p>
            
            {/* Breadcrumb */}
            <div className="mt-8 flex justify-center items-center space-x-2 text-sm text-gray-400">
                <Link href="/" className="hover:text-[#4ade80] transition">Beranda</Link>
                <span>/</span>
                <span className="text-[#4ade80] font-bold">Berita</span>
            </div>
        </div>
      </div>

      {/* 2. KONTEN UTAMA (Grid Berita) */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Search Bar (Opsional, untuk hiasan dulu) */}
        <div className="mb-12 flex justify-end">
            <div className="relative w-full md:w-1/3">
                <input 
                  type="text" 
                  placeholder="Cari berita..." 
                  className="w-full border border-gray-300 rounded-full py-3 px-6 pl-12 focus:outline-none focus:border-[#1e2338] transition"
                />
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
        </div>

        {/* LIST BERITA */}
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any, index: number) => (
              <Link 
                href={`/berita/${post.slug}`} 
                key={index}
                className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                {/* Gambar Thumbnail */}
                <div className="relative h-56 bg-gray-100 overflow-hidden">
                   {post.image ? (
                      <Image 
                        src={post.image} 
                        alt={post.title} 
                        fill 
                        className="object-cover group-hover:scale-110 transition duration-500"
                      />
                   ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-bold">NO IMAGE</div>
                   )}
                   
                   {/* Tanggal Badge */}
                   <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm text-xs font-bold text-[#1e2338] flex flex-col items-center">
                      <span className="text-lg leading-none">{post.date ? new Date(post.date).getDate() : '01'}</span>
                      <span className="uppercase text-[10px]">{post.date ? new Date(post.date).toLocaleString('default', { month: 'short' }) : 'JAN'}</span>
                   </div>
                </div>

                {/* Konten Teks */}
                <div className="p-6 flex flex-col flex-grow">
                    {/* Kategori */}
                    <div className="flex items-center space-x-2 text-xs text-[#4ade80] font-bold uppercase tracking-wider mb-3">
                        <FaFolder />
                        <span>{post.category || 'Umum'}</span>
                    </div>

                    {/* Judul */}
                    <h3 className="text-xl font-bold text-[#1e2338] mb-3 leading-snug group-hover:text-blue-600 transition line-clamp-2">
                        {post.title}
                    </h3>

                    {/* Excerpt / Ringkasan */}
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                        {post.excerpt || "Klik untuk membaca selengkapnya..."}
                    </p>

                    {/* Read More Link (Hiasan) */}
                    <div className="mt-auto pt-4 border-t border-gray-50 text-sm font-bold text-[#1e2338] group-hover:text-blue-600 flex items-center">
                        Baca Selengkapnya →
                    </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // JIKA TIDAK ADA BERITA
          <div className="text-center py-20">
             <h3 className="text-2xl font-bold text-gray-400">Belum ada berita yang diterbitkan.</h3>
             <p className="text-gray-500 mt-2">Silakan cek kembali nanti.</p>
          </div>
        )}

      </div>
    </main>
  );
}