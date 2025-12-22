import { visionTool } from "@sanity/vision"
import { pageStructure, singletonPlugin } from "~/plugins/settings"
import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { apiVersion, dataset, projectId } from "~/lib/sanity.api"

// --- IMPORT KOMPONEN LOGO (PERBAIKAN DI SINI) ---
// Gunakan "./" bukan "~/"
import { StudioLogo } from "./components/StudioLogo"

// --- 1. SCHEMA BAWAAN ---
import page from "~/schemas/documents/page"
import home from "~/schemas/singletons/home" 

// --- 2. SCHEMA KONTEN UTAMA ---
import post from "~/schemas/post"
import video from "~/schemas/video"
import gallery from "~/schemas/gallery"

// --- 3. SCHEMA HALAMAN DINAMIS ---
import layanan from "~/schemas/layanan"
import promo from "~/schemas/promo"
import dokumen from "~/schemas/dokumen"

const title = "Admin Panel - solusi-sertifikat.com"

export default defineConfig({
  name: "default",

  basePath: "/studio",
  projectId: projectId || "",
  dataset: dataset || "",
  title,

  // --- PASANG LOGO DI SINI ---
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
      structure: pageStructure([home]),
    }),
    singletonPlugin({ types: ["home"] }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})