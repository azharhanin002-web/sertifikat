import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { visionTool } from "@sanity/vision"
import { apiVersion, dataset, projectId, useCdn } from "~/lib/sanity.api"
import { singletonPlugin } from "~/plugins/settings"

// --- 1. IMPORT ICONS ---
import { 
  FaTachometerAlt, FaThumbtack, FaFileAlt, FaImages, 
  FaVideo, FaBriefcase, FaBullhorn, FaFilePdf, 
  FaAddressBook, FaQuoteLeft, FaInfoCircle 
} from 'react-icons/fa'

// --- 2. IMPORT KOMPONEN ---
import { StudioLogo } from "./components/StudioLogo"
import { DashboardWelcome } from "./components/DashboardWelcome" 
import { WordPressLayout } from "./components/WordPressLayout" 

// --- 3. IMPORT SCHEMA ---
import page from "~/schemas/documents/page"
import home from "~/schemas/singletons/home"
import post from "~/schemas/post"
import video from "~/schemas/video"
import gallery from "~/schemas/gallery"
import layanan from "~/schemas/layanan"
import promo from "~/schemas/promo"
import dokumen from "~/schemas/dokumen"
import contact from "~/schemas/contact"
import testimonial from "~/schemas/testimonial"
import about from "~/schemas/about" // <--- IMPORT BARU

const title = "Admin Panel - Solusi Sertifikasi"

export default defineConfig({
  name: "default",
  basePath: "/studio",
  projectId: projectId || "",
  dataset: dataset || "",
  title,

  studio: {
    components: {
      logo: StudioLogo,
      layout: WordPressLayout, 
    },
  },

  schema: {
    types: [
      home,
      page,
      post,      
      video,     
      gallery,   
      layanan,   
      promo,     
      dokumen,
      contact,
      testimonial,
      about, // <--- DAFTARKAN DISINI
    ],
  },

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Menu Utama') 
          .items([
            // 1. DASHBOARD
            S.listItem()
              .title('Dashboard')
              .icon(FaTachometerAlt)
              .child(
                S.component()
                  .id('dashboard-view')
                  .title('Dashboard')
                  .component(DashboardWelcome)
              ),

            S.divider(), 

            // 2. BERITA & ARTIKEL
            S.documentTypeListItem('post')
              .title('Berita & Artikel')
              .icon(FaThumbtack),

            // 3. LAYANAN (PORTFOLIO)
            S.documentTypeListItem('layanan')
              .title('Layanan Kami')
              .icon(FaBriefcase),

            // 4. MEDIA (VIDEO & GALLERY)
            S.listItem()
              .title('Media Galeri')
              .icon(FaImages)
              .child(
                S.list()
                  .title('Kelola Media')
                  .items([
                    S.documentTypeListItem('gallery').title('Foto Galeri').icon(FaImages),
                    S.documentTypeListItem('videoDoc').title('Video Youtube').icon(FaVideo),
                  ])
              ),

            // 5. PROMO & DOKUMEN
            S.documentTypeListItem('promo')
              .title('Promo Spesial')
              .icon(FaBullhorn),

            S.documentTypeListItem('dokumen')
              .title('File Download')
              .icon(FaFilePdf),

            S.divider(), 

            // 6. KONTAK & TESTIMONI
            S.documentTypeListItem('contact')
              .title('Daftar Kontak')
              .icon(FaAddressBook),

            S.documentTypeListItem('testimonial')
              .title('Testimoni Klien')
              .icon(FaQuoteLeft),

            S.divider(),

            // 7. HALAMAN DINAMIS (EDITABLE)
            
            // --- MENU TENTANG KAMI (SINGLETON) ---
            S.listItem()
                .title('Tentang Kami')
                .icon(FaInfoCircle)
                .child(
                    S.document()
                        .schemaType('about')
                        .documentId('about') // ID Tetap agar cuma 1 halaman
                ),

            // Opsi Edit Home Page (Singleton)
            S.listItem()
                .title('Edit Home Page')
                .icon(FaFileAlt)
                .child(
                    S.document()
                        .schemaType('home')
                        .documentId('home')
                ),
          ]),
    }),
    
    singletonPlugin({ types: ["home", "about"] }), // Tambahkan "about" agar tidak bisa "Create New"
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});