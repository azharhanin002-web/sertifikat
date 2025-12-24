import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { visionTool } from "@sanity/vision"
import { apiVersion, dataset, projectId, useCdn } from "~/lib/sanity.api"
import { singletonPlugin } from "~/plugins/settings"

// --- 1. IMPORT ICONS ---
import { 
  FaTachometerAlt, FaThumbtack, FaFileAlt, FaImages, 
  FaVideo, FaBriefcase, FaBullhorn, FaFilePdf, 
  FaAddressBook, FaInfoCircle, FaBuilding // Gunakan FaBuilding untuk ikon Klien
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
// import testimonial from "~/schemas/testimonial" // Testimoni bisa dihapus/dikomentari
import about from "~/schemas/about"
import client from "~/schemas/client" // Pastikan import schema client

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
      about,
      client, // Daftarkan schema client
      // testimonial, // Schema testimonial bisa dihapus jika sudah tidak dipakai
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

            // 3. LAYANAN
            S.documentTypeListItem('layanan')
              .title('Layanan Kami')
              .icon(FaBriefcase),

            // 4. MEDIA
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

            // 6. KONTAK & KLIEN (PERUBAHAN DISINI)
            S.documentTypeListItem('contact')
              .title('Daftar Kontak')
              .icon(FaAddressBook),

            // GANTI MENU TESTIMONI DENGAN DAFTAR KLIEN
            S.documentTypeListItem('client')
              .title('Daftar Klien')
              .icon(FaBuilding),

            S.divider(),

            // 7. HALAMAN DINAMIS
            S.listItem()
                .title('Tentang Kami')
                .icon(FaInfoCircle)
                .child(
                    S.document()
                        .schemaType('about')
                        .documentId('about')
                ),

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
    
    singletonPlugin({ types: ["home", "about"] }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});