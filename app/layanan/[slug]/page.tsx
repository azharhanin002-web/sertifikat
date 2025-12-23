import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLayananBySlug, getPosts } from "~/lib/sanity.client";
import { PortableText } from "@portabletext/react";
import { FaSearch, FaFolder, FaRegClock } from "react-icons/fa";
import { Metadata } from "next";

export const revalidate = 10;

type Props = {
  params: { slug: string };
};

// ... (Bagian generateMetadata TETAP SAMA, tidak perlu diubah) ...
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getLayananBySlug(params.slug);
  if (!data) return { title: "Layanan Tidak Ditemukan" };
  return {
    title: `${data.title} | PT Solusi Sertifikasi`,
    description: `Lihat rincian paket ${data.title}.`,
    openGraph: {
      title: data.title,
      url: `/layanan/${params.slug}`,
      siteName: 'PT Solusi Sertifikasi',
      images: [{ url: data.icon || "", width: 1200, height: 630, alt: data.title }],
      type: 'website',
    },
  };
}

export default async function LayananDetailPage({ params }: Props) {
  
  const data = await getLayananBySlug(params.slug);
  const recentPosts = await getPosts();

  if (!data) return notFound();

  return (
    <main className="min-h-screen font-sans bg-gray-50 pb-20">
      
      {/* HEADER */}
      <div className="bg-[#1e2338] text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{data.title}</h1>
            <div className="text-sm font-medium text-gray-300 flex flex-wrap items-center gap-1">
                <span>Anda di sini :</span>
                <Link href="/" className="text-[#fca311] hover:underline">Beranda</Link> 
                <span>/</span>
                <Link href="/layanan" className="text-[#fca311] hover:underline">Layanan</Link> 
                <span>/</span>
                <span className="text-white opacity-90">{data.title}</span>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* KONTEN UTAMA */}
          <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-sm border border-gray-100 h-fit">
              
              {/* GAMBAR */}
              <div className="w-full mb-8 relative rounded-lg overflow-hidden border border-gray-200 shadow-inner bg-gray-50">
                  {data.icon ? (
                      <Image src={data.icon} alt={data.title} width={1200} height={800} className="w-full h-auto object-contain" priority />
                  ) : (
                      <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400">No Image</div>
                  )}
                  <div className="absolute top-4 left-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 shadow-md z-10">LAYANAN UNGGULAN</div>
              </div>

              {/* DESKRIPSI DENGAN FITUR BARU */}
              <div>
                  <div className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed">
                      {data.description ? (
                          <div className="prose-ul:list-none prose-li:pl-0 prose-li:mb-2">
                            <PortableText 
                              value={data.description} 
                              components={{
                                // LIST
                                list: {
                                  bullet: ({children}) => <ul className="space-y-2 font-medium text-gray-800">{children}</ul>,
                                  number: ({children}) => <ol className="list-decimal pl-5 space-y-2 font-medium text-gray-800">{children}</ol>,
                                },
                                listItem: {
                                  bullet: ({children}) => <li className="flex items-start"><span className="mr-2 text-black font-bold">*</span><span>{children}</span></li>
                                },
                                // MARKS (Bold, Warna, Ukuran Font)
                                marks: {
                                  strong: ({children}) => <span className="font-bold">{children}</span>,
                                  
                                  // 1. WARNA TEKS
                                  textColor: ({value, children}) => (
                                    <span style={{ color: value.color }}>{children}</span>
                                  ),

                                  // 2. UKURAN FONT (PER KATA)
                                  fontSize: ({value, children}) => (
                                    // value.size berisi class Tailwind (misal: 'text-3xl')
                                    <span className={`${value.size} leading-normal inline-block`}>{children}</span>
                                  ),

                                  // 3. LINK
                                  link: ({value, children}) => (
                                    <a href={value.href} target="_blank" className="text-blue-600 underline hover:text-blue-800">{children}</a>
                                  )
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

          {/* SIDEBAR (TETAP SAMA) */}
          <div className="hidden lg:block space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="relative">
                      <input type="text" placeholder="Search..." className="w-full border border-gray-300 py-2 px-4 pr-10 rounded text-sm focus:outline-none focus:border-blue-500"/>
                      <button className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-blue-600"><FaSearch /></button>
                  </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-[#1e2338] mb-4 pb-2 border-b border-gray-100">Update Terkini</h3>
                  <ul className="space-y-4">
                      {recentPosts && recentPosts.slice(0, 5).map((post: any, idx: number) => (
                          <li key={idx}>
                              <Link href={`/berita/${post.slug}`} className="group block">
                                  <h4 className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition line-clamp-2 leading-snug mb-1">{post.title}</h4>
                                  <div className="flex items-center text-[10px] text-gray-400">
                                      <FaRegClock className="mr-1"/>{post.date ? new Date(post.date).toLocaleDateString('id-ID') : '-'}
                                  </div>
                              </Link>
                          </li>
                      ))}
                  </ul>
              </div>
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