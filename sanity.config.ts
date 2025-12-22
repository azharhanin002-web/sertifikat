import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { visionTool } from "@sanity/vision"
import { apiVersion, dataset, projectId } from "~/lib/sanity.api"
import { singletonPlugin } from "~/plugins/settings"

// --- 1. IMPORT ICONS ---
import { 
  FaTachometerAlt, FaThumbtack, FaFileAlt, FaImages, 
  FaVideo, FaBriefcase, FaBullhorn, FaFilePdf 
} from 'react-icons/fa'

// --- 2. IMPORT KOMPONEN (PERBAIKAN DISINI) ---
import { StudioLogo } from "./components/StudioLogo"
import { DashboardWelcome } from "./components/DashboardWelcome" // <--- Import Komponen Baru

// --- 3. IMPORT SCHEMA ---
import page from "~/schemas/documents/page"
import home from "~/schemas/singletons/home"
import post from "~/schemas/post"
import video from "~/schemas/video"
import gallery from "~/schemas/gallery"
import layanan from "~/schemas/layanan"
import promo from "~/schemas/promo"
import dokumen from "~/schemas/dokumen"

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
    ],
  },

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Dashboard')
          .items([
            // 1. DASHBOARD
            S.listItem()
              .title('Dashboard')
              .icon(FaTachometerAlt)
              .child(
                S.component()
                  .id('dashboard-view')
                  .title('Dashboard')
                  .component(DashboardWelcome) // <--- Panggil Komponen di sini (Tanpa JSX)
              ),

            S.divider(),

            // 2. BERITA (POSTS)
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

            // 5. PROMO
            S.documentTypeListItem('promo')
              .title('Promo Spesial')
              .icon(FaBullhorn),

            // 6. DOKUMEN (FILE DOWNLOAD)
            S.documentTypeListItem('dokumen')
              .title('File Download')
              .icon(FaFilePdf),

            S.divider(),

            // 7. HALAMAN (PAGES & HOME)
            S.listItem()
              .title('Halaman (Pages)')
              .icon(FaFileAlt)
              .child(
                S.list()
                  .title('Struktur Halaman')
                  .items([
                    S.listItem()
                      .title('Home Page')
                      .icon(FaFileAlt)
                      .child(
                        S.document()
                          .schemaType('home')
                          .documentId('home')
                      ),
                    S.documentTypeListItem('page').title('Halaman Lainnya'),
                  ])
              ),
          ]),
    }),
    
    singletonPlugin({ types: ["home"] }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})