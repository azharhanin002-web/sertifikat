import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { visionTool } from "@sanity/vision"
import { apiVersion, dataset, projectId, useCdn } from "~/lib/sanity.api"
import { singletonPlugin } from "~/plugins/settings"
// 1. IMPORT ORDERABLE DOCUMENT LIST
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

import { 
  FaTachometerAlt, FaThumbtack, FaFileAlt, FaImages, 
  FaVideo, FaBriefcase, FaBullhorn, FaFilePdf, 
  FaAddressBook, FaInfoCircle, FaBuilding 
} from 'react-icons/fa'

import { StudioLogo } from "./components/StudioLogo"
import { DashboardWelcome } from "./components/DashboardWelcome" 
import { WordPressLayout } from "./components/WordPressLayout" 

import page from "~/schemas/documents/page"
import home from "~/schemas/singletons/home"
import post from "~/schemas/post"
import video from "~/schemas/video"
import gallery from "~/schemas/gallery"
import layanan from "~/schemas/layanan"
import promo from "~/schemas/promo"
import dokumen from "~/schemas/dokumen"
import contact from "~/schemas/contact"
import about from "~/schemas/about"
import client from "~/schemas/client" 

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
      client, 
    ],
  },

  plugins: [
    deskTool({
      structure: (S, context) => // Tambahkan 'context' disini
        S.list()
          .title('Menu Utama') 
          .items([
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

            S.documentTypeListItem('post').title('Berita & Artikel').icon(FaThumbtack),
            S.documentTypeListItem('layanan').title('Layanan Kami').icon(FaBriefcase),

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

            S.documentTypeListItem('promo').title('Promo Spesial').icon(FaBullhorn),
            S.documentTypeListItem('dokumen').title('File Download').icon(FaFilePdf),

            S.divider(), 

            S.documentTypeListItem('contact').title('Daftar Kontak').icon(FaAddressBook),

            // --- 2. UBAH BAGIAN INI AGAR BISA DIGESER ---
            orderableDocumentListDeskItem({
                type: 'client',
                title: 'Daftar Klien (Geser)',
                icon: FaBuilding,
                S,
                context
            }),
            // ---------------------------------------------

            S.divider(),

            S.listItem()
                .title('Tentang Kami')
                .icon(FaInfoCircle)
                .child(
                    S.document().schemaType('about').documentId('about')
                ),

            S.listItem()
                .title('Edit Home Page')
                .icon(FaFileAlt)
                .child(
                    S.document().schemaType('home').documentId('home')
                ),
          ]),
    }),
    
    singletonPlugin({ types: ["home", "about"] }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});