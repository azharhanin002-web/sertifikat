// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { getPosts, getVideos, getGallery } from "~/lib/sanity.client"; 

import { 
  FaLaptopCode, FaStopwatch, FaUserTie, FaChevronDown, 
  FaStar, FaPlay 
} from 'react-icons/fa';

export default async function Home() {
  
  // --- FETCH DATA ---
  const posts = await getPosts();
  const videos = await getVideos();
  const gallery = await getGallery();

  // --- DATA STATIC ---
  const pricingData = [
    { title: "SKUP Migas", price: "Rp 25jt", image: "/mockup-migas.png", features: ["Free Konsultasi", "Proses Pengerjaan Online", "Bebas Pilih Jumlah Bidang Usaha", "SKUP Migas dari Dirjen Migas ESDM"] },
    { title: "SBUJPTL", price: "Rp 12jt", image: "/mockup-sbujptl.png", features: ["Free Konsultasi Sertifikasi", "Proses Pengerjaan Online", "Sertifikat Badan Usaha Jasa Penunjang Tenaga Listrik"] },
    { title: "SKTTK (SERKOM)", price: "Rp 8.5jt", image: "/mockup-skttk.png", features: ["Free Konsultasi Sertifikasi", "Asesmen Online", "SKTTK dari Lembaga Sertifikasi Terakreditasi ESDM"] },
    { title: "SBU Konstruksi", price: "Rp 3.5jt", image: "/mockup-sbu.png", features: ["Free Konsultasi Sertifikasi", "Proses Pengerjaan Online", "Sertifikat Badan Usaha (SBU) dari PUPR"] }
  ];

  const faqData = [
    { question: "Apakah dokumen yang diterbitkan resmi?", answer: "Tentu saja. Kami menjamin 100% keaslian dokumen. Semua sertifikat diterbitkan langsung oleh instansi terkait dan dapat diverifikasi secara online." },
    { question: "Berapa lama proses pengerjaannya?", answer: "Estimasi waktu bervariasi. Untuk SBU biasanya 14-30 hari kerja, sedangkan SKTTK bisa lebih cepat sekitar 7-14 hari kerja setelah dokumen lengkap." },
    { question: "Apakah saya perlu datang ke kantor?", answer: "Tidak perlu. Seluruh proses pengumpulan data hingga terbitnya sertifikat dilakukan secara ONLINE." },
    { question: "Bagaimana jika pengajuan ditolak?", answer: "Kami memberikan GARANSI uang kembali atau proses ulang gratis jika kegagalan disebabkan oleh kelalaian tim kami." }
  ];

  const portfolioData = [
    { title: "GMP (Good Manufacturing Practices)", category: "Sertifikasi Pabrik", link: "/portofolio/gmp" },
    { title: "HACCP Certification", category: "Keamanan Pangan", link: "/portofolio/haccp" },
    { title: "Izin Usaha Panas Bumi (EBTKE)", category: "Energi Terbarukan", link: "/portofolio/ebtke" },
    { title: "SKUP Migas", category: "Minyak & Gas", link: "/portofolio/skup-migas" },
    { title: "ISO 9001:2015", category: "Manajemen Mutu", link: "/portofolio/iso-9001" },
    { title: "SMK3 Kemnaker", category: "K3 Konstruksi", link: "/portofolio/smk3" }
  ];

  const testimonials = [
    { name: "Melanie", role: "Pengusaha - Bandar Lampung", text: "Terimakasih telah membantu pendirian PT saya. Team menjelaskan dengan detail setiap pertanyaan yang saya ajukan.", image: "/user-1.jpg" },
    { name: "Budi Santoso", role: "Kontraktor - Jakarta", text: "Proses pengerjaan di Workshop Legalitas cepat dan sesuai dengan kebutuhan. Pelayanan dari team memuaskan.", image: "/user-2.jpg" },
    { name: "Saputra Dwi Wijaya", role: "CEO Startup - Depok", text: "Layanan yang diberikan sangat baik. Semua bisa dilakukan online tanpa harus datang ke lokasi. Hemat waktu.", image: "/user-3.jpg" }
  ];

  // --- LOGIKA FALLBACK ---
  const blogData = (posts && posts.length > 0) ? posts : [
    { title: "CONTOH: PT vs CV (Data Dummy)", category: "Pendirian Badan Usaha", date: "2025-10-23", image: "/blog-1.jpg", excerpt: "Ini muncul karena Anda belum isi konten di Sanity. Silakan input data dulu." },
    { title: "CONTOH: Mengatasi Risiko", category: "Angkutan B3", date: "2025-04-28", image: "/blog-2.jpg", excerpt: "Data ini akan hilang otomatis jika Anda sudah publish berita di Sanity Studio." },
    { title: "CONTOH: ISO 9001", category: "Sertifikasi", date: "2025-04-25", image: "/blog-3.jpg", excerpt: "Segera isi konten di localhost:3000/studio menu Post." }
  ];

  const videoDisplayData = (videos && videos.length > 0) ? videos : [
      { title: "Company Profile (Dummy)", thumb: "/video-thumb-1.jpg" },
      { title: "Testimoni Klien (Dummy)", thumb: "/video-thumb-2.jpg" }
  ];

  const galleryDisplayData = (gallery && gallery.length > 0) ? gallery : [
      { image: null }, { image: null }, { image: null }, { image: null }, { image: null }, { image: null } 
  ];


  return (
    <main className="min-h-screen font-sans bg-white">
      
      {/* CATATAN PENTING:
          Header (Navbar) dan Footer SUDAH DIHAPUS dari sini.
          Sekarang mereka dipanggil otomatis dari 'app/layout.tsx'.
          Jadi di sini kita langsung mulai dari HERO SECTION.
      */}

      {/* HERO SECTION */}
      <section className="relative h-[500px] lg:h-[600px] flex items-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
           <Image src="/neo.webp" alt="Hero Background" fill className="object-cover object-right" priority />
        </div>
        <div className="absolute inset-0 bg-[#1e2338] opacity-95 z-10" style={{ clipPath: 'polygon(0 0, 35% 0, 15% 100%, 0% 100%)' }}></div>
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-10">
          <div className="max-w-xl text-white">
            <p className="text-xs md:text-sm font-bold tracking-[0.1em] mb-4 uppercase text-gray-300">Buat Pilihan Terbaik</p>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">Kami Adalah Yang<br/>Terbaik Saat Ini</h1>
          </div>
        </div>
      </section>
      
      {/* FEATURES */}
      <section className="bg-gray-100 py-20 px-6 font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col gap-10">
            <div>
                <div className="flex items-center space-x-2 text-gray-500 mb-4"><div className="flex -space-x-1"><div className="w-3 h-3 rounded-full bg-slate-600"></div><div className="w-3 h-3 rounded-full bg-slate-400 opacity-50"></div></div><span className="font-medium text-slate-600 text-sm">Your Smart legality Partner</span></div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e2338] leading-tight mb-6">Kami Selalu Melayani<br/>Dengan Sepenuh Hati</h2>
                <p className="text-gray-500 leading-relaxed text-base md:text-lg">Workshop Legalitas adalah salah satu produk dari PT Workshop Mahakarya Indonesia yang memberikan layanan Business Legality Consultant serta Management & Employee Competency Certification.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition duration-300 border-b-4 border-transparent hover:border-blue-500 group">
                <div className="mb-6"><FaStopwatch className="text-5xl text-cyan-500 group-hover:scale-110 transition-transform duration-300" /></div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Fast Process</h3><hr className="w-full border-gray-100 mb-4" />
                <p className="text-gray-500 text-sm leading-relaxed">Setiap layanan yang kami tawarkan dikerjakan oleh tim kami yang sudah berpengalaman mengurus setiap perizinan.</p>
            </div>
          </div>
          <div className="flex flex-col gap-8 lg:-mt-24"> 
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition duration-300 border-b-4 border-transparent hover:border-orange-500 group">
                <div className="mb-6"><FaLaptopCode className="text-5xl text-yellow-500 group-hover:scale-110 transition-transform duration-300" /></div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Online Processing</h3><hr className="w-full border-gray-100 mb-4" />
                <p className="text-gray-500 text-sm leading-relaxed">Proses pengerjaan perizinan dapat dilakukan online seluruh indonesia. Anda tidak perlu datang ke kantor kami.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition duration-300 border-b-4 border-transparent hover:border-blue-500 group">
                <div className="mb-6"><FaUserTie className="text-5xl text-green-500 group-hover:scale-110 transition-transform duration-300" /></div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Professional Consultant</h3><hr className="w-full border-gray-100 mb-4" />
                <p className="text-gray-500 text-sm leading-relaxed">Konsultasikan semua kebutuhan legalitas usaha anda dengan tim kami yang sudah berpengalaman pada bidangnya.</p>
            </div>
          </div>
        </div>
      </section>      

      {/* STATISTIK */}
      <section className="relative h-[500px] flex items-center bg-gray-900 overflow-hidden font-sans">
        <div className="absolute inset-0 z-0">
          <Image src="/neo.webp" alt="Stats Background" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#1e2338] opacity-90 z-10"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="text-white">
            <div className="flex items-center space-x-2 mb-4 opacity-90"><div className="flex -space-x-1"><div className="w-3 h-3 rounded-full bg-white"></div><div className="w-3 h-3 rounded-full bg-white opacity-50"></div></div><span className="text-sm font-bold tracking-widest uppercase">KAMI BERI SOLUSI</span></div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-12 leading-tight">Anda Masih Ragu?<br />Coba Lihat Ini</h2>
            <div className="grid grid-cols-3 gap-8 border-t border-white/20 pt-8">
              <div><div className="text-4xl md:text-5xl font-extrabold text-white">.30<span className="text-red-500">+</span></div><p className="mt-2 text-sm opacity-80 uppercase tracking-widest">layanan</p></div>
              <div><div className="text-4xl md:text-5xl font-extrabold text-white">822</div><p className="mt-2 text-sm opacity-80 uppercase tracking-widest">project selesai</p></div>
              <div><div className="text-4xl md:text-5xl font-extrabold text-white">428<span className="text-red-500">+</span></div><p className="mt-2 text-sm opacity-80 uppercase tracking-widest">klien puas</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SLIDER */}
      <section className="py-20 bg-white overflow-hidden font-sans">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
             <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">Pilihan Paket Terbaik</h2>
             <p className="text-gray-500 max-w-2xl mx-auto">Sesuaikan kebutuhan legalitas perusahaan Anda dengan paket hemat yang kami tawarkan.</p>
          </div>
          <div className="flex overflow-x-auto pb-8 space-x-6 snap-x snap-mandatory scrollbar-hide">
            {pricingData.map((item, index) => (
              <div key={index} className={`min-w-[300px] md:min-w-[320px] bg-white rounded-3xl p-6 flex-shrink-0 snap-center transition-all duration-300 border ${index === 0 ? 'border-red-400 shadow-xl scale-100' : 'border-gray-200 hover:border-blue-300 hover:shadow-lg'}`}>
                <div className="mb-4">
                    <h3 className="text-gray-600 font-medium text-sm mb-1">{item.title}</h3>
                    <div className="flex items-start">
                        <span className="text-xs bg-black text-white rounded-full px-1 mr-1 mt-1">Rp</span>
                        <span className="text-4xl font-extrabold text-gray-900">{item.price.replace('Rp ','').replace('jt','')}</span>
                        <span className="text-2xl font-bold text-gray-900 mt-2">jt</span>
                    </div>
                    <div className="text-gray-400 text-xs italic">basic price</div>
                </div>
                <div className="relative h-40 w-full bg-gray-100 rounded-lg mb-6 overflow-hidden flex items-center justify-center border border-gray-200">
                   <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-white opacity-50"></div>
                   <span className="text-gray-400 text-xs z-10">Gambar {item.title}</span>
                </div>
                <button className={`block w-full py-2.5 rounded-lg font-bold text-sm text-center transition mb-6 ${index === 0 ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-200' : 'bg-white border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white'}`}>Contact Us</button>
                <div className="space-y-2 border-t pt-4">
                  <p className="text-xs text-gray-500 mb-2">Detail paket harga</p>
                  {item.features.map((feature, i) => (
                    <div key={i} className="flex items-start text-xs text-gray-600"><span className="mr-2 text-orange-400 font-bold">›</span>{feature}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#1e2338] text-white font-sans">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div>
                    <div className="mb-10"><div className="flex -space-x-1 mb-4"><div className="w-3 h-3 rounded-full bg-slate-500"></div><div className="w-3 h-3 rounded-full bg-slate-400 opacity-50"></div></div><span className="text-gray-300 font-medium text-sm block mb-2">Seputar Layanan</span><h2 className="text-3xl md:text-4xl font-bold leading-tight">Frequently Asked<br/>Questions</h2></div>
                    <div className="space-y-4">
                        {faqData.map((item, index) => (
                            <details key={index} className="group bg-transparent border-b border-gray-700 pb-4">
                                <summary className="flex justify-between items-center cursor-pointer list-none font-bold text-lg select-none hover:text-gray-300 transition"><span>{item.question}</span><span className="transition-transform duration-300 group-open:rotate-180 border rounded-full p-1 border-gray-500"><FaChevronDown className="text-xs"/></span></summary>
                                <div className="text-gray-400 leading-relaxed pt-4 mt-2 text-sm">{item.answer}</div>
                            </details>
                        ))}
                    </div>
                </div>
                <div className="relative h-[500px] w-full rounded-2xl overflow-hidden hidden lg:block">
                     <div className="absolute inset-0 bg-gray-600 rounded-2xl"></div> {/* Placeholder gambar */}
                </div>
            </div>
        </div>
      </section>

      {/* PORTOFOLIO */}
      <section className="py-20 bg-white font-sans">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
               <div className="flex items-center justify-center space-x-2 mb-2"><div className="flex -space-x-1"><div className="w-3 h-3 rounded-full bg-slate-600"></div><div className="w-3 h-3 rounded-full bg-slate-400 opacity-50"></div></div><span className="text-sm font-medium text-gray-500">Karya Luar Biasa</span></div>
               <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e2338]">Portofolio Kami</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {portfolioData.map((item, index) => (
                  <Link href={item.link} key={index} className="group relative h-[300px] rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all">
                     <div className="absolute inset-0 bg-[#3b4363]"></div>
                     <div className="absolute inset-0 flex items-center justify-center opacity-20"><span className="text-6xl font-bold text-white">IMG</span></div>
                     <div className="absolute bottom-0 left-0 p-6 w-full">
                        <h3 className="text-white text-lg font-bold leading-tight mb-2">{item.title}</h3>
                        <div className="h-0.5 w-8 bg-gray-400 group-hover:w-16 transition-all duration-300"></div>
                     </div>
                  </Link>
               ))}
            </div>
         </div>
      </section>

      {/* GALLERY DOKUMENTASI (FETCHED FROM SANITY) */}
      <section className="py-20 bg-white font-sans">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
               <div className="flex items-center justify-center space-x-2 mb-2"><div className="flex -space-x-1"><div className="w-3 h-3 rounded-full bg-slate-600"></div><div className="w-3 h-3 rounded-full bg-slate-400 opacity-50"></div></div><span className="text-sm font-medium text-gray-500">Dokumentasi</span></div>
               <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e2338]">Gallery Post</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
               {/* Gunakan galleryDisplayData */}
               {galleryDisplayData.map((item: any, index: number) => (
                  <div key={index} className="relative h-48 md:h-64 rounded-lg overflow-hidden bg-gray-100 hover:shadow-lg transition cursor-pointer group">
                     {item.image ? (
                        <Image src={item.image} alt={item.caption || 'Gallery'} fill className="object-cover group-hover:scale-110 transition duration-500"/>
                     ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-bold text-2xl">FOTO</div>
                     )}
                     {/* Overlay Caption (jika ada) */}
                     {item.caption && (
                         <div className="absolute bottom-0 left-0 w-full bg-black/60 p-2 text-white text-xs opacity-0 group-hover:opacity-100 transition">
                             {item.caption}
                         </div>
                     )}
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* TESTIMONI */}
      <section className="py-24 bg-white font-sans">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <div className="flex items-center justify-center space-x-2 mb-2"><div className="flex -space-x-1"><div className="w-3 h-3 rounded-full bg-slate-600"></div><div className="w-3 h-3 rounded-full bg-slate-400 opacity-50"></div></div><span className="text-sm font-medium text-gray-500">Testimoni</span></div>
               <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e2338]">Apa Yang Mereka Katakan?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {testimonials.map((item, index) => (
                  <div key={index} className="bg-white p-8 rounded-lg shadow-[0_5px_20px_rgba(0,0,0,0.05)] border border-gray-50">
                     <div className="flex space-x-1 text-[#4ade80] mb-4 text-xs">{[...Array(5)].map((_, i) => <FaStar key={i} />)}</div>
                     <p className="text-gray-600 text-sm leading-relaxed mb-6">"{item.text}"</p>
                     <div className="flex items-center mt-auto pt-4">
                        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden mr-3"><div className="w-full h-full bg-gray-300"></div></div>
                        <div><h4 className="font-bold text-gray-900 text-sm">{item.name}</h4><span className="text-xs text-[#4ade80] font-medium">{item.role}</span></div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* UPDATE TERKINI (FETCHED FROM SANITY) */}
      <section className="py-20 bg-white font-sans">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
               <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e2338]">Update Terkini</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Gunakan blogData (yang sudah ada logika fallback) */}
                {blogData.map((item: any, index: number) => (
                    <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition group border border-gray-100 flex flex-col h-full">
                        <div className="relative h-48 bg-blue-50 overflow-hidden flex items-center justify-center">
                             {item.image ? (
                                <Image src={item.image} alt={item.title} fill className="object-cover" />
                             ) : (
                                <div className="text-center">
                                    <h4 className="font-bold text-blue-900 text-sm uppercase mb-2">IMAGE</h4>
                                </div>
                             )}
                             <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded text-xs font-bold shadow z-10">
                                {item.date ? item.date.split('-')[2] : '01'} <br/> 
                                <span className="text-[10px] text-gray-500">{item.date ? item.date.split('-')[1] : 'Jan'}</span>
                             </div>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">{item.category || 'Berita'}</span>
                            <h3 className="text-lg font-bold text-[#1e2338] mb-3 leading-tight group-hover:text-blue-700 transition cursor-pointer">{item.title}</h3>
                            <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3 flex-grow">{item.excerpt}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* VIDEO DOKUMENTASI (FETCHED FROM SANITY) */}
      <section className="py-20 bg-white font-sans">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
               <div className="flex items-center justify-center space-x-2 mb-2"><div className="flex -space-x-1"><div className="w-3 h-3 rounded-full bg-slate-600"></div><div className="w-3 h-3 rounded-full bg-slate-400 opacity-50"></div></div><span className="text-sm font-medium text-gray-500">Dari Channel Resmi</span></div>
               <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e2338]">Video Dokumentasi</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Gunakan videoDisplayData */}
                {videoDisplayData.map((item: any, index: number) => (
                    <div key={index} className="group relative h-72 rounded-xl overflow-hidden cursor-pointer shadow-lg">
                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center font-bold text-gray-400">
                             {item.thumb ? (
                                <Image src={item.thumb} alt={item.title} fill className="object-cover"/>
                             ) : (
                                "VIDEO THUMBNAIL"
                             )}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition">
                            <a href={item.youtubeUrl || '#'} target="_blank" rel="noreferrer">
                                <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition"><FaPlay className="text-[#1e2338] ml-1" /></div>
                            </a>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent"><h3 className="text-white font-bold text-lg">{item.title}</h3></div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* CATATAN PENTING:
          Bagian FOOTER juga SUDAH DIHAPUS. 
          Footer akan muncul otomatis di bawah semua konten ini karena dipanggil oleh layout.tsx.
      */}

    </main>
  );
}