import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId, useCdn } from "./sanity.api"
import {
  footerQuery,
  FooterQueryResponse,
  homePageQuery,
  HomePageQueryResponse,
  mainPagesSlugsQuery,
  MainPagesSlugsQueryResponse,
  pagesBySlugQuery,
  PagesBySlugQueryResponse,
  pagesSeoBySlugQuery,
  PagesSeoBySlugQueryResponse,
  secondaryPagesSlugsQuery,
  SecondaryPagesSlugsQueryResponse,
  settingsQuery,
  SettingsQueryResponse,
  // --- IMPORT QUERY UTAMA ---
  postsQuery,
  PostsQueryResponse,
  postBySlugQuery, 
  videosQuery,
  VideosQueryResponse,
  galleryQuery,
  GalleryQueryResponse,
  // --- IMPORT QUERY BARU ---
  layananQuery,
  layananDetailQuery, 
  LayananResponse,
  promoQuery,
  promoDetailQuery,    
  dokumenQuery,
  dokumenByCategoryQuery,
  DokumenResponse,
} from "./sanity.queries"

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
export const sanityClient = (token?: string) => {
  return projectId
    ? createClient({ projectId, dataset, apiVersion, useCdn, token: token })
    : null
}

// --- FUNGSI BAWAAN TEMPLATE ---

export async function getHomePage(token?: string) {
  return await sanityClient(token)
    ?.fetch(homePageQuery)
    .then((result) => {
      if (!result) return null
      return HomePageQueryResponse.parse(result)
    })
}

export async function getFooter(token?: string) {
  return await sanityClient(token)
    ?.fetch(footerQuery)
    .then((result) => {
      if (!result) return null
      return FooterQueryResponse.parse(result)
    })
}

export async function getSettingsPage(token?: string) {
  return await sanityClient(token)
    ?.fetch(settingsQuery)
    .then((result) => {
      if (!result) return null
      return SettingsQueryResponse.parse(result)
    })
}

export async function getPageBySlug(slug: string, token?: string) {
  return await sanityClient(token)
    ?.fetch(pagesBySlugQuery, { slug })
    .then((result) => {
      if (!result) return null
      return PagesBySlugQueryResponse.parse(result)
    })
}

export async function getPageSeoBySlug(slug: string, token?: string) {
  return await sanityClient(token)
    ?.fetch(pagesSeoBySlugQuery, { slug })
    .then((result) => {
      if (!result) return null
      return PagesSeoBySlugQueryResponse.parse(result)
    })
}

export async function getMainPagesSlugs(token?: string) {
  return await sanityClient(token)
    ?.fetch(mainPagesSlugsQuery)
    .then((result) => {
      if (!result) return []
      return MainPagesSlugsQueryResponse.parse(result)
    })
}

export async function getSecondaryPagesSlugs(token?: string) {
  return await sanityClient(token)
    ?.fetch(secondaryPagesSlugsQuery)
    .then((result) => {
      if (!result) return []
      return SecondaryPagesSlugsQueryResponse.parse(result)
    })
}

// ==========================================
// FUNGSI UTAMA (HOME PAGE)
// ==========================================

export async function getPosts(token?: string) {
  return await sanityClient(token)
    ?.fetch(postsQuery)
    .then((result) => {
      if (!result) return []
      return PostsQueryResponse.parse(result)
    })
}

export async function getVideos(token?: string) {
  return await sanityClient(token)
    ?.fetch(videosQuery)
    .then((result) => {
      if (!result) return []
      return VideosQueryResponse.parse(result)
    })
}

export async function getGallery(token?: string) {
  return await sanityClient(token)
    ?.fetch(galleryQuery)
    .then((result) => {
      if (!result) return []
      return GalleryQueryResponse.parse(result)
    })
}

// ==========================================
// FUNGSI HALAMAN TAMBAHAN (LISTING)
// ==========================================

export async function getLayanan(token?: string) {
  return await sanityClient(token)
    ?.fetch(layananQuery)
    .then((result) => {
      if (!result) return []
      return LayananResponse.parse(result)
    })
}

export async function getPromo(token?: string) {
  return await sanityClient(token)
    ?.fetch(promoQuery)
    .then((result) => (result ? result : [])) 
}

export async function getDokumen(token?: string) {
  return await sanityClient(token)
    ?.fetch(dokumenQuery)
    .then((result) => {
      if (!result) return []
      return DokumenResponse.parse(result)
    })
}

// ==========================================
// FUNGSI HALAMAN DETAIL (DYNAMIC ROUTING)
// ==========================================

// 1. Ambil 1 Layanan berdasarkan Slug
export async function getLayananBySlug(slug: string, token?: string) {
  return await sanityClient(token)?.fetch(layananDetailQuery, { slug })
}

// 2. Ambil 1 Promo berdasarkan Slug
export async function getPromoBySlug(slug: string, token?: string) {
  return await sanityClient(token)?.fetch(promoDetailQuery, { slug })
}

// 3. Ambil Dokumen berdasarkan Kategori (Slug)
export async function getDokumenByCategory(category: string) {
  const formattedCategory = category.replace(/-/g, ' ');
  
  return await sanityClient()?.fetch(dokumenByCategoryQuery, { category: formattedCategory })
    .then((result) => {
       if (!result) return []
       return result;
    })
}

// 4. Ambil 1 Berita berdasarkan Slug
export async function getPostBySlug(slug: string, token?: string) {
  return await sanityClient(token)?.fetch(postBySlugQuery, { slug })
}

// ==========================================
// FUNGSI BARU (TESTIMONI & KONTAK)
// ==========================================

export async function getTestimonials() {
  return await sanityClient()?.fetch(`*[_type == "testimonial"] | order(_createdAt desc) {
    name,
    role,
    message,
    "image": photo.asset->url,
    rating
  }`);
}

// PERBAIKAN: Mengambil SEMUA kontak (Array) untuk Grid 3 Kolom
// Menghapus [0] agar tidak cuma ambil satu
export async function getContacts() {
  return await sanityClient()?.fetch(`*[_type == "contact"] | order(_createdAt asc) {
    title,
    address,
    phone,
    email
  }`);
}