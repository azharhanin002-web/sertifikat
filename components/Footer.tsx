import Image from 'next/image';
import { 
  FaPhoneAlt, FaEnvelope, FaRegClock, FaFacebookF, 
  FaInstagram, FaLinkedinIn, FaYoutube 
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#1e2338] text-gray-400 py-16 font-sans">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
                {/* LOGO FOOTER */}
                <div className="flex items-center mb-6">
                    <Image 
                       src="/logo-solusi.png" 
                       alt="Workshop Legalitas" 
                       width={180} 
                       height={50} 
                       className="h-10 w-auto object-contain brightness-0 invert opacity-80" 
                    />
                </div>
                
                <p className="text-xs leading-relaxed mb-6 text-gray-500">Kami adalah mitra terpercaya Anda dalam mengurus segala kebutuhan legalitas dan sertifikasi perusahaan.</p>
                <div className="flex space-x-3">
                    <div className="h-8 w-8 bg-[#2d334c] rounded flex items-center justify-center hover:bg-blue-600 hover:text-white transition cursor-pointer"><FaFacebookF className="text-xs"/></div>
                    <div className="h-8 w-8 bg-[#2d334c] rounded flex items-center justify-center hover:bg-pink-600 hover:text-white transition cursor-pointer"><FaInstagram className="text-xs"/></div>
                    <div className="h-8 w-8 bg-[#2d334c] rounded flex items-center justify-center hover:bg-blue-800 hover:text-white transition cursor-pointer"><FaLinkedinIn className="text-xs"/></div>
                    <div className="h-8 w-8 bg-[#2d334c] rounded flex items-center justify-center hover:bg-red-600 hover:text-white transition cursor-pointer"><FaYoutube className="text-xs"/></div>
                </div>
            </div>
            <div><h4 className="text-white font-bold mb-6 text-sm">Layanan Kami</h4><ul className="space-y-2 text-xs"><li><a href="#" className="hover:text-white transition">Pendirian PT & CV</a></li><li><a href="#" className="hover:text-white transition">SBU Konstruksi</a></li><li><a href="#" className="hover:text-white transition">Sertifikasi ISO</a></li><li><a href="#" className="hover:text-white transition">SKUP Migas</a></li></ul></div>
            <div><h4 className="text-white font-bold mb-6 text-sm">Tautan Cepat</h4><ul className="space-y-2 text-xs"><li><a href="#" className="hover:text-white transition">Tentang Kami</a></li><li><a href="#" className="hover:text-white transition">Hubungi Kami</a></li><li><a href="#" className="hover:text-white transition">Blog & Berita</a></li></ul></div>
            <div><h4 className="text-white font-bold mb-6 text-sm">Hubungi Kami</h4><ul className="space-y-3 text-xs"><li className="flex items-start"><FaPhoneAlt className="mt-0.5 mr-3 text-gray-500" /><span>021-2787-4648 (Office)<br/>0895-3243-83400 (WhatsApp)</span></li><li className="flex items-start"><FaEnvelope className="mt-0.5 mr-3 text-gray-500" /><span>marketing@workshop-indonesia.com</span></li><li className="flex items-start"><FaRegClock className="mt-0.5 mr-3 text-gray-500" /><span>Senin - Jumat: 08.00 - 17.00</span></li></ul></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-[#2d334c] text-center text-[10px] text-gray-600">
            <p>© 2025 Workshop Legalitas Indonesia. All Rights Reserved.</p>
        </div>
      </footer>
  );
}