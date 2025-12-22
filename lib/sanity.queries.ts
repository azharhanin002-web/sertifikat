import { groq } from "next-sanity"
import { z } from "zod"

// ==========================================
// 1. EXISTING QUERIES (BAWAAN TEMPLATE)
// ==========================================

export const homePageQuery = groq`
  *[_type == "home"][0]{
    title,
    description
  }
`

export const HomePageQueryResponse = z.object({
  title: z.string().nullish(),
  description: z.string().nullish(),
})

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    menuItems[]->{
      _id,
      title,
      has_external_link,
      external_link,
      has_secondary_pages,
      main_page->{_id,title,"slug": slug.current},
      secondary_pages[]->{_id,title,"slug": slug.current}
    },
  }
`

const Slug = z.string().min(1)

const SettingsNavPage = z.object({
  _id: z.string().min(1),
  title: z.string().min(1),
  slug: Slug,
})

export const SettingsMenuItem = z.object({
  _id: z.string().min(1),
  title: z.string().min(1),
  has_external_link: z.boolean().nullish(),
  external_link: z.string().nullish(),
  main_page: SettingsNavPage.nullish(),
  has_secondary_pages: z.boolean().nullish(),
  secondary_pages: SettingsNavPage.array().nullish(),
})

export const SettingsQueryResponse = z.object({
  menuItems: SettingsMenuItem.array().nullish(),
})

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    content,
  }
`

const baseTypedObjectZ = z
  .object({
    _type: z.string(),
    _key: z.string(),
  })
  .passthrough()

export const portableContentBlockZ = z.array(baseTypedObjectZ)

export const PagesBySlugQueryResponse = z
  .object({
    _id: z.string().min(1),
    title: z.string().min(1),
    content: portableContentBlockZ.nullish(),
  })
  .nullish()

export const pagesSeoBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    ...seo
  }
`

export const PagesSeoBySlugQueryResponse = z
  .object({
    preventIndexing: z.boolean().nullish(),
    metaTitle: z.string().nullish(),
    metaDescription: z.string().nullish(),
    keywords: z.string().nullish(),
  })
  .nullish()

export const footerQuery = groq`
  *[_type == "settings"][0]{
    'content': footer
  }
`

export const FooterQueryResponse = z
  .object({
    content: portableContentBlockZ.nullish(),
  })
  .nullish()

export const mainPagesSlugsQuery = groq`
   *[_type == "navigation" && has_secondary_pages == false && has_external_link == false]{
      main_page->{'slug':slug.current,  _updatedAt}
  }
`

const pageSlugZ = z.object({
  slug: Slug,
  _updatedAt: z.string(),
})

export const MainPagesSlugsQueryResponse = z
  .object({
    main_page: pageSlugZ,
  })
  .array()

export const secondaryPagesSlugsQuery = groq`
  *[_type == "navigation" && has_secondary_pages == true && has_external_link == false]{
      main_page->{'slug':slug.current,  _updatedAt},
      secondary_pages[]->{'slug':slug.current,  _updatedAt}
  }
`

export const SecondaryPagesSlugsQueryResponse = z
  .object({
    main_page: pageSlugZ,
    secondary_pages: pageSlugZ.array(),
  })
  .array()


// ==========================================
// 2. NEW QUERIES (FITUR TAMBAHAN KITA)
// ==========================================

// --- A. BERITA / BLOG ---
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    category,
    "date": publishedAt,
    "image": mainImage.asset->url,
    excerpt,
    "slug": slug.current
  }
`
export const PostZ = z.object({
  _id: z.string(),
  title: z.string().nullish(),
  category: z.string().nullish(),
  date: z.string().nullish(),
  image: z.string().nullish(),
  excerpt: z.string().nullish(),
  slug: z.string().nullish(),
})
export const PostsQueryResponse = z.array(PostZ).nullish()


// --- B. VIDEO ---
export const videosQuery = groq`
  *[_type == "videoDoc"] | order(_createdAt desc) {
    _id,
    title,
    "thumb": thumbnail.asset->url,
    youtubeUrl
  }
`
export const VideoZ = z.object({
  _id: z.string(),
  title: z.string().nullish(),
  thumb: z.string().nullish(),
  youtubeUrl: z.string().nullish(),
})
export const VideosQueryResponse = z.array(VideoZ).nullish()


// --- C. GALLERY ---
export const galleryQuery = groq`
  *[_type == "gallery"] | order(_createdAt desc) {
    _id,
    caption,
    "image": image.asset->url
  }
`
export const GalleryZ = z.object({
  _id: z.string(),
  caption: z.string().nullish(),
  image: z.string().nullish(),
})
export const GalleryQueryResponse = z.array(GalleryZ).nullish()


// --- D. LAYANAN ---
// 1. Listing (Daftar Layanan)
export const layananQuery = groq`
  *[_type == "layanan"] {
    _id, title, shortDesc,
    "slug": slug.current,
    "icon": icon.asset->url
  }
`
export const LayananResponse = z.array(z.object({
  _id: z.string(),
  title: z.string().nullish(),
  shortDesc: z.string().nullish(),
  slug: z.string().nullish(),
  icon: z.string().nullish(),
})).nullish()

// 2. Detail (Satu Layanan)
export const layananDetailQuery = groq`
  *[_type == "layanan" && slug.current == $slug][0] {
    title,
    "icon": icon.asset->url,
    description
  }
`


// --- E. PROMO ---
// 1. Listing (Daftar Promo)
export const promoQuery = groq`
  *[_type == "promo"] {
    _id, title, period,
    "slug": slug.current,
    "image": image.asset->url,
    description
  }
`

// 2. Detail (Satu Promo)
export const promoDetailQuery = groq`
  *[_type == "promo" && slug.current == $slug][0] {
    title,
    "image": image.asset->url,
    period,
    description
  }
`


// --- F. DOKUMEN ---
// 1. Listing (Semua Dokumen)
export const dokumenQuery = groq`
  *[_type == "dokumen"] {
    _id, title, category,
    "fileUrl": file.asset->url
  }
`
export const DokumenResponse = z.array(z.object({
  _id: z.string(),
  title: z.string().nullish(),
  category: z.string().nullish(),
  fileUrl: z.string().nullish(),
})).nullish()

// 2. By Category (Untuk halaman /dokumen/[slug])
// Ini PENTING untuk halaman kategori dokumen
export const dokumenByCategoryQuery = groq`
  *[_type == "dokumen" && lower(category) == lower($category)] | order(_createdAt desc) {
    _id,
    title,
    category,
    "fileUrl": file.asset->url
  }
`