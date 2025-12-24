import Image from 'next/image';
import Link from 'next/link';
// Import fungsi getTestimonials
import { getPosts, getVideos, getGallery, getLayanan, getTestimonials } from "~/lib/sanity.client"; 
import ScrollAnimationWrapper from "~/components/ScrollAnimationWrapper";
import Counter from "~/components/Counter";
import PricingSlider from "~/components/PricingSlider";
import VideoSection from "~/components/VideoSection";

import { 
  FaLaptopCode, FaStopwatch, FaUserTie, FaChevronDown, 
  FaStar, FaFolder, FaRegClock 
} from 'react-icons/fa';

export const revalidate = 10; 

export default async function Home() {
  const posts = await getPosts();
  const videos = await getVideos();
  const gallery = await getGallery();
  const layananData = await getLayanan();
  // Fetch data testimoni
  const testimonialData = await getTestimonials();

  // --- DATA MAPPING ---
  
  // Mapping Testimoni: Gunakan data Sanity jika ada, jika tidak gunakan dummy
  const testimonials = (testimonialData && testimonialData.length > 0) 
    ? testimonialData.map((item: any) => ({
        name: item.name,
        role: item.role,
        text: item.message,
        image: item.image, // URL Gambar dari Sanity
        rating: item.rating || 5
      }))
    : [ // Data Dummy Fallback
        { name: "Melanie", role: "Pengusaha - Bandar Lampung", text: "Terimakasih telah membantu pendirian PT saya. Team menjelaskan dengan detail setiap pertanyaan yang saya ajukan.", image: "/user-1.jpg" }, 
        { name: "Budi Santoso", role: "Kontraktor - Jakarta", text: "Proses pengerjaan di Workshop Legalitas cepat dan sesuai dengan kebutuhan. Pelayanan dari team memuaskan.", image: "/user-2.jpg" }, 
        { name: "Saputra Dwi Wijaya", role: "CEO Startup - Depok", text: "Layanan yang diberikan sangat baik. Semua bisa dilakukan online tanpa harus datang ke lokasi. Hemat waktu.", image: "/user-3.jpg" }
      ];

  const blogData = (posts && posts.length > 0) ? posts.map((post: any) => ({ title: post.title, slug: post.slug || '#', category: post.category || 'Berita', date: post.date ? new Date(post.date).toISOString().split('T')[0] : '2025', image: post.image || '/blog-1.jpg', excerpt: post.excerpt || "Klik untuk membaca informasi selengkapnya..." })) : [{ title: "Data Belum Tersedia", slug: "#", category: "-", date: "2025", image: "/blog-1.jpg", excerpt: "-" }];
  const portfolioDisplay = (layananData && layananData.length > 0) ? layananData.map((item: any) => ({ title: item.title, link: item.slug ? `/layanan/${item.slug}` : '#', image: item.icon || '/mockup-migas.png', desc: item.shortDesc || "Layanan profesional terpercaya." })) : [{ title: "SKUP Migas", link: "#", image: "/mockup-migas.png", desc: "Perizinan SKUP Migas" }, { title: "SBU Konstruksi", link: "#", image: "/mockup-sbu.png", desc: "Sertifikat Badan Usaha" }, { title: "ISO 9001:2015", link: "#", image: "/mockup-skttk.png", desc: "Manajemen Mutu" }];
  const galleryDisplay = (gallery && gallery.length > 0) ? gallery.map((item: any) => ({ image: item.image, caption: item.caption })) : [{ image: null }, { image: null }, { image: null }];
  const videoDisplayData = (videos && videos.length > 0) ? videos : [{ title: "Company Profile (Dummy)", thumb: "/video-thumb-1.jpg", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }, { title: "Testimoni Klien (Dummy)", thumb: "/video-thumb-2.jpg", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }];
  const faqData = [{ question: "Apakah dokumen yang diterbitkan resmi?", answer: "Tentu saja. Kami menjamin 100% keaslian dokumen. Semua sertifikat diterbitkan langsung oleh instansi terkait dan dapat diverifikasi secara online." }, { question: "Berapa lama proses pengerjaannya?", answer: "Estimasi waktu bervariasi. Untuk SBU biasanya 14-30 hari kerja, sedangkan SKTTK bisa lebih cepat sekitar 7-14 hari kerja setelah dokumen lengkap." }, { question: "Apakah saya perlu datang ke kantor?", answer: "Tidak perlu. Seluruh proses pengumpulan data hingga terbitnya sertifikat dilakukan secara ONLINE." }, { question: "Bagaimana jika pengajuan ditolak?", answer: "Kami memberikan GARANSI uang kembali atau proses ulang gratis jika kegagalan disebabkan oleh kelalaian tim kami." }];

  return (
    <main className="min-h-screen font-sans bg-white">
      
      {/* === HERO SECTION === */}
      <section className="relative h-[480px] md:h-[600px] flex items-center overflow-hidden bg-[#222244]">
        
        {/* 1. LAYER GAMBAR + ANIMASI FADE */}
        <ScrollAnimationWrapper className="absolute inset-0 z-0 w-full h-full animate-fade-in">
           <Image 
             src="/neo.webp" 
             alt="Hero Background" 
             fill 
             className="object-cover object-[75%_center] md:object-right" 
             priority 
           />
        </ScrollAnimationWrapper>

        {/* 2. LAYER OVERLAY */}
        {/* Mobile: Opacity 40% */}
        <div 
          className="absolute inset-0 bg-[#222244] opacity-40 z-10 md:hidden" 
          style={{ clipPath: 'polygon(0 0, 75% 0, 45% 100%, 0% 100%)' }} 
        ></div>
        {/* Desktop: Opacity 95% */}
        <div 
          className="absolute inset-0 bg-[#222244] opacity-95 z-10 hidden md:block" 
          style={{ clipPath: 'polygon(0 0, 60% 0, 40% 100%, 0% 100%)' }} 
        ></div>

        {/* 3. LAYER KONTEN TEKS */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full h-full flex items-center pt-8 md:pt-0">
          <div className="w-[65%] md:max-w-2xl text-white animate-fade-in-left">
            <p className="text-xs md:text-xl font-bold tracking-[0.15em] uppercase text-gray-300 mb-3 md:mb-4">
               BUAT PILIHAN TERBAIK
            </p>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold leading-tight text-white drop-shadow-xl">
              <span className="block">Kami Adalah</span>
              <span className="block">Yang Terbaik</span>
              <span className="block">Saat Ini</span>
            </h1>
          </div>
        </div>
      </section>
      
      {/* === FEATURES SECTION (YANG HILANG DIKEMBALIKAN DISINI) === */}
      <section className="bg-gray-100 py-20 px-6 font-sans overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <div className="flex flex-col gap-10">
            <ScrollAnimationWrapper className="animate-fade-in-left">
                <div>
                    <div className="flex items-center space-x-2 text-gray-500 mb-4"><div className="flex -space-x-1"><div className="w-3 h-3 rounded-full bg-slate-600"></div><div className="w-3 h-3 rounded-full bg-slate-400 opacity-50"></div></div><span className="font-medium text-slate-600 text-sm">Your Smart legality Partner</span></div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e2338] leading-tight mb-6">Kami Selalu Melayani<br/>Dengan Sepenuh Hati</h2>
                    <p className="text-gray-500 leading-relaxed text-base md:text-lg">Workshop Legalitas adalah salah satu produk dari PT Workshop Mahakarya Indonesia yang memberikan layanan Business Legality Consultant serta Management & Employee Competency Certification.</p>
                </div>
            </ScrollAnimationWrapper>
            
            {/* FAST PROCESS CARD */}
            <ScrollAnimationWrapper className="animate-fade-in-up">
                <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition duration-300 border-b-4 border-transparent hover:border-blue-500 group">
                    <div className="mb-6"><FaStopwatch className="text-5xl text-cyan-500 group-hover:scale-110 transition-transform duration-300" /></div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Fast Process</h3><hr className="w-full border-gray-100 mb-4" />
                    <p className="text-gray-500 text-base leading-relaxed">Setiap layanan yang kami tawarkan dikerjakan oleh tim kami yang sudah berpengalaman mengurus setiap perizinan.</p>
                </div>
            </ScrollAnimationWrapper>
          </div>
          
          <div className="flex flex-col gap-8 lg:-mt-24"> 
            {/* ONLINE PROCESSING CARD */}
            <ScrollAnimationWrapper className="animate-fade-in-up delay-[200ms]">
                <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition duration-300 border-b-4 border-transparent hover:border-orange-500 group">
                    <div className="mb-6"><FaLaptopCode className="text-5xl text-yellow-500 group-hover:scale-110 transition-transform duration-300" /></div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Online Processing</h3><hr className="w-full border-gray-100 mb-4" />
                    <p className="text-gray-500 text-base leading-relaxed">Proses pengerjaan perizinan dapat dilakukan online seluruh indonesia. Anda tidak perlu datang ke kantor kami.</p>
                </div>
            </ScrollAnimationWrapper>
            
            {/* PROFESSIONAL CONSULTANT CARD */}
            <ScrollAnimationWrapper className="animate-fade-in-up delay-[400ms]">
                <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition duration-300 border-b-4 border-transparent hover:border-blue-500 group">
                    <div className="mb-6"><FaUserTie className="text-5xl text-green-500 group-hover:scale-110 transition-transform duration-300" /></div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Professional Consultant</h3><hr className="w-full border-gray-100 mb-4" />
                    <p className="text-gray-500 text-base leading-relaxed">Konsultasikan semua kebutuhan legalitas usaha anda dengan tim kami yang sudah berpengalaman pada bidangnya.</p>
                </div>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </section>      

      {/* STATISTIK */}
      <section className="relative h-[650px] flex items-center bg-gray-900 overflow-hidden font-sans">
        <div className="absolute inset-0 z-0">
          <Image src="/neo.webp" alt="Stats Background" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#1e2338] opacity-80 z-10"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="text-white">
            <ScrollAnimationWrapper className="animate-fade-in-left">
                <div>
                    <div className="flex items-center space-x-2 mb-4 opacity-90"><div className="flex -space-x-1"><div className="w-3 h-3 rounded-full bg-white"></div><div className="w-3 h-3 rounded-full bg-white opacity-50"></div></div><span className="text-sm font-bold tracking-widest uppercase">KAMI BERI SOLUSI</span></div>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-12 leading-tight">Anda Masih Ragu?<br />Coba Lihat Ini</h2>
                </div>
            </ScrollAnimationWrapper>
            
            <div className="grid grid-cols-3 gap-8 border-t border-white/20 pt-8">
              <div>
                  <div className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-white flex items-baseline">
                      <span className="text-red-500 mr-1">.</span><Counter end={30} /><span className="text-red-500 ml-1">+</span>
                  </div>
                  <p className="mt-4 text-lg md:text-xl font-bold opacity-90 capitalize">layanan</p>
              </div>
              <div>
                  <div className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-white flex items-baseline">
                      <Counter end={822} />
                  </div>
                  <p className="mt-4 text-lg md:text-xl font-bold opacity-90 capitalize">project selesai</p>
              </div>
              <div>
                  <div className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-white flex items-baseline">
                      <Counter end={428} /><span className="text-red-500 ml-1">+</span>
                  </div>
                  <p className="mt-4 text-lg md:text-xl font-bold opacity-90 capitalize">klien yang puas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SLIDER */}
      <section className="py-20 bg-white overflow-hidden font-sans">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
             <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">Pilihan Paket Terbaik</h2>
             <p className="text-gray-500 max-w-2xl mx-auto text-base">Sesuaikan kebutuhan legalitas perusahaan Anda dengan paket hemat yang kami tawarkan.</p>
          </div>
          <PricingSlider />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#1e2338] text-white font-sans overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <ScrollAnimationWrapper className="animate-fade-in-left">
                      <div className="space-y-4">
                          {faqData.map((item, index) => (
                              <details key={index} className="group bg-transparent border-b border-gray-700 pb-4">
                                  <summary className="flex justify-between items-center cursor-pointer list-none font-bold text-lg select-none hover:text-gray-300 transition"><span>{item.question}</span><span className="transition-transform duration-300 group-open:rotate-180 border rounded-full p-1 border-gray-500"><FaChevronDown className="text-xs"/></span></summary>
                                  <div className="text-gray-400 leading-relaxed pt-4 mt-2 text-base">{item.answer}</div>
                              </details>
                          ))}
                      </div>
                    </ScrollAnimationWrapper>
                </div>
                <div className="relative h-[500px] lg:h-[600px] w-full rounded-3xl overflow-hidden hidden lg:block shadow-2xl">
                      <Image src="/accord6.webp" alt="FAQ Background" fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1e2338] via-[#1e2338]/60 to-transparent z-10"></div>
                      <div className="absolute bottom-0 left-0 p-10 z-20">
                        <ScrollAnimationWrapper className="animate-fade-in-up">
                           <div className="flex items-center space-x-2 mb-4 opacity-90"><div className="flex -space-x-1"><div className="w-3 h-3 rounded-full bg-white"></div><div className="w-3 h-3 rounded-full bg-white opacity-50"></div></div><span className="text-sm font-bold tracking-widest uppercase">Seputar Layanan</span></div>
                           <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">Frequently Asked<br/>Questions</h2>
                        </ScrollAnimationWrapper>
                      </div>
                </div>
            </div>
        </div>
      </section>

      {/* PORTOFOLIO / LAYANAN */}
      <section className="py-20 bg-white font-sans">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
               <div className="flex items-center justify-center space-x-2 mb-2"><div className="flex -space-x-1"><div className="w-3 h-3 rounded-full bg-slate-600"></div><div className="w-3 h-3 rounded-full bg-slate-400 opacity-50"></div></div><span className="text-sm font-medium text-gray-500">Karya Luar Biasa</span></div>
               <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e2338]">Layanan Kami</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
               {portfolioDisplay.slice(0, 6).map((item: any, index: number) => (
                  <Link href={item.link} key={index} className="group relative h-[300px] rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all border border-gray-100 block">
                      <div className="absolute inset-0 bg-[#3b4363] opacity-0 group-hover:opacity-90 transition-opacity duration-300 z-10"></div>
                      {item.image ? (
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      ) : (
                        <div className="absolute inset-0 bg-gray-200"></div>
                      )}
                      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition duration-300 px-4 text-center">
                        <span className="text-2xl font-bold text-white mb-2">LIHAT</span>
                        <p className="text-white text-xs">{item.desc}</p>
                      </div>
                      <div className="absolute bottom-0 left-0 p-6 w-full z-20 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="text-white text-lg font-bold leading-tight mb-2 drop-shadow-md">{item.title}</h3>
                        <div className="h-0.5 w-8 bg-gray-400 group-hover:w-16 transition-all duration-300"></div>
                      </div>
                  </Link>
               ))}
            </div>
            <div className="text-center">
                <Link href="/layanan" className="inline-block px-8 py-3 rounded-full border-2 border-[#1e2338] text-[#1e2338] font-bold hover:bg-[#1e2338] hover:text-white transition duration-300">
                    Lihat Semua Layanan
                </Link>
            </div>
         </div>
      </section>

      {/* GALLERY POST */}
      <section className="py-20 bg-white font-sans">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
               <div className="flex items-center justify-center space-x-2 mb-2"><div className="flex -space-x-1"><div className="w-3 h-3 rounded-full bg-slate-600"></div><div className="w-3 h-3 rounded-full bg-slate-400 opacity-50"></div></div><span className="text-sm font-medium text-gray-500">Dokumentasi</span></div>
               <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e2338]">Gallery Post</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
               {galleryDisplay.slice(0, 6).map((item: any, index: number) => (
                  <div key={index} className="relative h-48 md:h-64 rounded-lg overflow-hidden bg-gray-100 hover:shadow-lg transition cursor-pointer group">
                      {item.image ? (
                        <Image src={item.image} alt={item.caption || 'Gallery'} fill className="object-cover group-hover:scale-110 transition duration-500"/>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-bold text-2xl">FOTO</div>
                      )}
                      {item.caption && (
                          <div className="absolute bottom-0 left-0 w-full bg-black/60 p-2 text-white text-xs opacity-0 group-hover:opacity-100 transition">
                              {item.caption}
                          </div>
                      )}
                  </div>
               ))}
            </div>
            <div className="text-center">
                <Link href="/gallery" className="inline-block px-8 py-3 rounded-full border-2 border-[#1e2338] text-[#1e2338] font-bold hover:bg-[#1e2338] hover:text-white transition duration-300">
                    Lihat Gallery Lengkap
                </Link>
            </div>
         </div>
      </section>

      {/* TESTIMONI - DENGAN AVATAR DINAMIS */}
      <section className="py-24 bg-white font-sans">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <div className="flex items-center justify-center space-x-2 mb-2"><div className="flex -space-x-1"><div className="w-3 h-3 rounded-full bg-slate-600"></div><div className="w-3 h-3 rounded-full bg-slate-400 opacity-50"></div></div><span className="text-sm font-medium text-gray-500">Testimoni</span></div>
               <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e2338]">Apa Yang Mereka Katakan?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {testimonials.map((item: any, index: number) => (
                  <div key={index} className="bg-white p-8 rounded-lg shadow-[0_5px_20px_rgba(0,0,0,0.05)] border border-gray-50 hover:shadow-lg transition">
                      
                      <div className="flex space-x-1 text-[#4ade80] mb-4 text-sm">{[...Array(item.rating || 5)].map((_, i) => <FaStar key={i} />)}</div>
                      
                      <p className="text-gray-600 text-base md:text-lg italic leading-relaxed mb-6">"{item.text}"</p>
                      
                      <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
                        {/* AVATAR USER DARI SANITY */}
                        <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-4 flex-shrink-0 relative border border-gray-100">
                             {item.image ? (
                                <Image 
                                  src={item.image} 
                                  alt={item.name} 
                                  fill 
                                  className="object-cover" 
                                />
                             ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
                                   <FaUserTie />
                                </div>
                             )}
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-lg">{item.name}</h4>
                            <span className="text-sm text-[#4ade80] font-medium">{item.role}</span>
                        </div>
                      </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* UPDATE TERKINI */}
      <section className="py-20 bg-white font-sans">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
               <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e2338]">Update Terkini</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {blogData.slice(0, 6).map((item: any, index: number) => (
                    <Link 
                      href={`/berita/${item.slug}`} 
                      key={index} 
                      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition group border border-gray-100 flex flex-col h-full block"
                    >
                        <div className="relative h-48 bg-blue-50 overflow-hidden flex items-center justify-center">
                             {item.image ? (
                                <Image src={item.image} alt={item.title} fill className="object-cover" />
                             ) : (
                                <div className="text-center"><h4 className="font-bold text-blue-900 text-sm uppercase mb-2">IMAGE</h4></div>
                             )}
                             <div className="absolute bottom-4 right-4 bg-white px-3 py-1.5 rounded text-xs font-bold shadow z-10">
                                {item.date}
                             </div>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">{item.category}</span>
                            <h3 className="text-xl font-bold text-[#1e2338] mb-3 leading-tight group-hover:text-blue-700 transition cursor-pointer line-clamp-2">{item.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">{item.excerpt}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="text-center">
                <Link href="/berita" className="inline-block px-8 py-3 rounded-full border-2 border-[#1e2338] text-[#1e2338] font-bold hover:bg-[#1e2338] hover:text-white transition duration-300">
                    Lihat Semua Berita
                </Link>
            </div>
        </div>
      </section>

      {/* VIDEO DOKUMENTASI */}
      <section className="py-20 bg-white font-sans">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
               <div className="flex items-center justify-center space-x-2 mb-2"><div className="flex -space-x-1"><div className="w-3 h-3 rounded-full bg-slate-600"></div><div className="w-3 h-3 rounded-full bg-slate-400 opacity-50"></div></div><span className="text-sm font-medium text-gray-500">Dari Youtube</span></div>
               <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e2338]">Video Edukasi</h2>
            </div>
            
            <VideoSection videos={videoDisplayData} />

        </div>
      </section>

    </main>
  );
}