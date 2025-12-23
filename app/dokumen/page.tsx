import Link from 'next/link';
import { getDokumen } from '~/lib/sanity.client';
import { FaFilePdf, FaDownload, FaFolderOpen } from 'react-icons/fa';

export const revalidate = 10;

export default async function DokumenPage() {
  const dokumen = await getDokumen();

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      
      {/* HEADER */}
      <div className="bg-[#1e2338] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Pusat Unduhan</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Akses dan unduh dokumen resmi, formulir, dan regulasi terkait sertifikasi.
            </p>
            
            {/* Breadcrumb */}
            <div className="mt-8 flex justify-center items-center space-x-2 text-sm text-gray-400">
                <Link href="/" className="hover:text-[#4ade80] transition">Beranda</Link>
                <span>/</span>
                <span className="text-[#4ade80] font-bold">Dokumen</span>
            </div>
        </div>
      </div>

      {/* LIST DOKUMEN */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        {dokumen && dokumen.length > 0 ? (
          <div className="grid gap-6">
            {dokumen.map((doc: any, index: number) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between group">
                
                {/* Info Dokumen */}
                <div className="flex items-start space-x-4 mb-4 md:mb-0">
                    <div className="bg-red-100 text-red-600 p-3 rounded-lg group-hover:bg-red-600 group-hover:text-white transition">
                        <FaFilePdf className="text-2xl" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#1e2338] transition">{doc.title}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                            <FaFolderOpen className="text-xs" />
                            <span className="bg-gray-100 px-2 py-0.5 rounded text-xs uppercase font-bold tracking-wider">{doc.category || 'Umum'}</span>
                        </div>
                    </div>
                </div>

                {/* Tombol Download */}
                <a 
                    href={`${doc.fileUrl}?dl=`} // Tambah ?dl= agar otomatis download
                    className="flex items-center space-x-2 bg-[#1e2338] text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-[#4ade80] hover:text-[#1e2338] transition shadow-lg w-full md:w-auto justify-center"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaDownload />
                    <span>Download</span>
                </a>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
             <div className="text-6xl mb-4 opacity-30">📂</div>
             <h3 className="text-2xl font-bold text-gray-400">Belum ada dokumen yang tersedia.</h3>
          </div>
        )}
      </div>

    </main>
  );
}