import { getDokumenByCategory } from "~/lib/sanity.client";
import { FaFilePdf, FaDownload, FaFolderOpen, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

export default async function DokumenPage({ params }: { params: { slug: string } }) {
  
  const slug = params.slug;
  const categoryName = slug.replace(/-/g, ' '); 
  const documents = await getDokumenByCategory(categoryName);

  return (
    <main className="min-h-screen font-sans bg-gray-50 py-20">
      
      {/* CATATAN: 
          Kode Header, Topbar, dan Navbar SUDAH DIHAPUS dari sini.
          Sekarang otomatis muncul dari layout.tsx.
      */}

      <div className="max-w-5xl mx-auto px-6">
        
        <div className="mb-8">
            <Link href="/" className="text-sm text-gray-500 hover:text-blue-900 flex items-center gap-2 transition">
                <FaArrowLeft /> Kembali ke Beranda
            </Link>
        </div>

        <div className="text-center mb-12">
            <span className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-2 block">
                Arsip Dokumen
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 uppercase">
                {categoryName}
            </h1>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm">
                Silakan unduh dokumen resmi terkait {categoryName} di bawah ini untuk keperluan administrasi Anda.
            </p>
        </div>

        {documents.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-16 bg-white rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="bg-gray-100 p-6 rounded-full mb-4">
                    <FaFolderOpen className="text-4xl text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-600">Dokumen Tidak Ditemukan</h3>
                <p className="text-gray-400 text-sm mt-2 max-w-md">
                    Belum ada file yang diupload untuk kategori "<b>{categoryName}</b>" di Sanity.
                </p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {documents.map((doc: any) => (
                    <div key={doc._id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex items-center group">
                        <div className="bg-red-50 p-4 rounded-xl mr-5 group-hover:bg-red-500 transition duration-300">
                            <FaFilePdf className="text-3xl text-red-500 group-hover:text-white transition duration-300" />
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1" title={doc.title}>
                                {doc.title}
                            </h3>
                            <span className="text-[10px] uppercase font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded tracking-wider">
                                {doc.category || 'PDF File'}
                            </span>
                        </div>
                        {doc.fileUrl ? (
                            <a 
                                href={`${doc.fileUrl}?dl=`} 
                                className="ml-4 p-3 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition shadow-sm"
                                title="Download File Ini"
                            >
                                <FaDownload />
                            </a>
                        ) : (
                            <span className="text-xs text-red-400 italic ml-2">File Rusak</span>
                        )}
                    </div>
                ))}
            </div>
        )}

      </div>
    </main>
  );
}