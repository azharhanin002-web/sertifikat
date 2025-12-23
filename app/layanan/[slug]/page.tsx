import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLayananBySlug, getPosts } from "~/lib/sanity.client";
import { PortableText } from "@portabletext/react";
import { FaSearch, FaFolder, FaRegClock } from "react-icons/fa";

// Update data tiap 10 detik
export const revalidate = 10;

export default async function LayananDetailPage({ params }: { params: { slug: string } }) {
  
  // 1. Ambil Data Layanan
  const data = await getLayananBySlug(params.slug);
  
  // 2. Ambil Data Recent Posts untuk Sidebar
  const recentPosts = await getPosts();

  if (!data) return notFound();

  return (
    <main className="min-h-screen font-sans bg-gray-50 pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* ==========================
              KOLOM KIRI (KONTEN UTAMA)
             ========================== */}
          <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-sm border border-gray-100 h-fit">
              
              {/* 1. GAMBAR PRODUK (FULL WIDTH DI ATAS) - DIPERBAIKI */}
              <div className="w-full mb-8 relative rounded-lg overflow-hidden border border-gray-200 shadow-inner bg-gray-50">
                  {data.icon ? (
                      // Hapus 'fill' dan 'aspect-video'. Gunakan width/height dinamis.
                      // Kita set width/height besar agar Next.js mengoptimalkannya, 
                      // tapi CSS w-full h-auto akan membuatnya responsif sesuai kontainer.
                      <Image 
                        src={data.icon} 
                        alt={data.title} 
                        width={1200} // Nilai arbitrary besar untuk kualitas baik
                        height={800} // Nilai arbitrary besar
                        className="w-full h-auto object-contain" // Gunakan object-contain agar tidak terpotong
                        priority
                      />
                  ) : (
                      <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400">No Image</div>
                  )}
                  
                  {/* Label */}
                  <div className="absolute top-4 left-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 shadow-md z-10">
                      LAYANAN UNGGULAN
                  </div>
              </div>

              {/* 2. DETAIL & DESKRIPSI (DI BAWAH GAMBAR) */}
              <div>
                  {/* Tabel Info Singkat */}
                  <div className="border-b border-gray-200 pb-6 mb-6">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
                          <span className="text-gray-500 font-medium">Nama Layanan</span>
                          <span className="col-span-2 font-bold text-[#1e2338] text-xl">{data.title}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
                          <span className="text-gray-500 font-medium">Estimasi Harga</span>
                          <span className="col-span-2 font-bold text-red-500 text-lg">Hubungi Kami</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <span></span>
                          <span className="col-span-2 text-xs text-gray-400 italic">Harga dapat berubah sewaktu-waktu sesuai kebijakan.</span>
                      </div>
                  </div>

                  {/* Isi Konten Lengkap (Menggunakan Styling dari Referensi) */}
                  <div className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed">
                      
                      {/* Judul Paket */}
                      <h3 className="text-red-600 font-bold text-2xl mb-4">
                        Paket : <span className="text-[#1e2338]">{data.title}</span>
                      </h3>

                      {/* Deskripsi (Portable Text) */}
                      {data.description ? (
                          <div className="prose-ul:list-none prose-li:pl-0 prose-li:mb-2">
                            <PortableText 
                              value={data.description} 
                              components={{
                                // Kustomisasi tampilan list agar mirip referensi (pakai bintang *)
                                list: {
                                  bullet: ({children}) => <ul className="space-y-2 font-medium text-gray-800">{children}</ul>,
                                },
                                listItem: {
                                  bullet: ({children}) => <li className="flex items-start"><span className="mr-2 text-black font-bold">*</span><span>{children}</span></li>
                                }
                              }}
                            />
                          </div>
                      ) : (
                          <p className="text-gray-500 italic">Belum ada deskripsi detail untuk layanan ini.</p>
                      )}
                  </div>
              </div>

          </div>

          {/* ==========================
              KOLOM KANAN (SIDEBAR) - TETAP SAMA
             ========================== */}
          <div className="hidden lg:block space-y-8">
              
              {/* Search Widget */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="relative">
                      <input type="text" placeholder="Search..." className="w-full border border-gray-300 py-2 px-4 pr-10 rounded text-sm focus:outline-none focus:border-blue-500"/>
                      <button className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-blue-600">
                          <FaSearch />
                      </button>
                  </div>
              </div>

              {/* Recent Posts Widget */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-[#1e2338] mb-4 pb-2 border-b border-gray-100">Update Terkini</h3>
                  <ul className="space-y-4">
                      {recentPosts && recentPosts.slice(0, 5).map((post: any, idx: number) => (
                          <li key={idx}>
                              <Link href={`/berita/${post.slug}`} className="group block">
                                  <h4 className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition line-clamp-2 leading-snug mb-1">
                                      {post.title}
                                  </h4>
                                  <div className="flex items-center text-[10px] text-gray-400">
                                      <FaRegClock className="mr-1"/>
                                      {post.date ? new Date(post.date).toLocaleDateString('id-ID') : '-'}
                                  </div>
                              </Link>
                          </li>
                      ))}
                  </ul>
              </div>

              {/* Categories Widget */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-[#1e2338] mb-4 pb-2 border-b border-gray-100">Kategori</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                      <li><Link href="#" className="flex items-center hover:text-blue-600"><FaFolder className="mr-2 text-gray-300"/> Angkutan B3</Link></li>
                      <li><Link href="#" className="flex items-center hover:text-blue-600"><FaFolder className="mr-2 text-gray-300"/> Kelistrikan</Link></li>
                      <li><Link href="#" className="flex items-center hover:text-blue-600"><FaFolder className="mr-2 text-gray-300"/> Konstruksi</Link></li>
                      <li><Link href="#" className="flex items-center hover:text-blue-600"><FaFolder className="mr-2 text-gray-300"/> Perizinan ESDM</Link></li>
                  </ul>
              </div>

          </div>

      </div>
    </main>
  );
}