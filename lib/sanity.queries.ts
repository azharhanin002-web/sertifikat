import { groq } from "next-sanity"
import { z } from "zod"

// ==========================================
// 1. EXISTING QUERIES (TEMPLATE DEFAULTS)
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
// 2. NEW QUERIES (CUSTOM ADDITIONS)
// ==========================================

// --- A. NEWS / BLOG POSTS ---
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    // Fetch title from the first category reference
    "category": categories[0]->title, 
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

// --- POST BY SLUG (NEW) ---
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    title,
    "category": categories[0]->title,
    "date": publishedAt,
    "image": mainImage.asset->url,
    body,
    "author": author->name
  }
`

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


// --- D. SERVICES (LAYANAN) ---
// 1. Listing (List of Services)
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

// 2. Detail (Single Service)
export const layananDetailQuery = groq`
  *[_type == "layanan" && slug.current == $slug][0] {
    title,
    "icon": icon.asset->url,
    description // Typically PortableText
  }
`


// --- E. PROMO ---
// 1. Listing (List of Promos)
export const promoQuery = groq`
  *[_type == "promo"] {
    _id, title, period,
    "slug": slug.current,
    "image": image.asset->url,
    description
  }
`

// 2. Detail (Single Promo)
export const promoDetailQuery = groq`
  *[_type == "promo" && slug.current == $slug][0] {
    title,
    "image": image.asset->url,
    period,
    description
  }
`


// --- F. DOCUMENTS ---
// 1. Listing (All Documents)
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

// 2. By Category (For /dokumen/[slug] pages)
export const dokumenByCategoryQuery = groq`
  *[_type == "dokumen" && lower(category) == lower($category)] | order(_createdAt desc) {
    _id,
    title,
    category,
    "fileUrl": file.asset->url
  }
`

// --- G. TESTIMONIALS (DEPRECATED/OLD) ---
// Masih disimpan agar tidak error jika ada kode lama yang memanggil
export const testimonialQuery = groq`
  *[_type == "testimonial"] | order(_createdAt desc) {
    name,
    role,
    message,
    "image": photo.asset->url,
    rating
  }
`
export const TestimonialResponse = z.array(z.object({
  name: z.string().nullish(),
  role: z.string().nullish(),
  message: z.string().nullish(),
  image: z.string().nullish(),
  rating: z.number().nullish(),
})).nullish()


// --- H. CONTACT (NEW) ---
export const contactQuery = groq`
  *[_type == "contact"] | order(_createdAt asc) {
    title,
    address,
    phone,
    email
  }
`
export const ContactResponse = z.array(z.object({
  title: z.string().nullish(),
  address: z.string().nullish(),
  phone: z.string().nullish(),
  email: z.string().nullish(),
})).nullish()


// --- I. ABOUT US (NEW) ---
export const aboutQuery = groq`
  *[_type == "about"][0]{
    title,
    "heroImage": heroImage.asset->url,
    overview,
    vision,
    mission,
    ceoName,
    ceoMessage,
    "ceoImage": ceoImage.asset->url
  }
`
export const AboutResponse = z.object({
  title: z.string().nullish(),
  heroImage: z.string().nullish(),
  overview: z.any().nullish(), // Portable Text
  vision: z.string().nullish(),
  mission: z.array(z.string()).nullish(),
  ceoName: z.string().nullish(),
  ceoMessage: z.string().nullish(),
  ceoImage: z.string().nullish(),
}).nullish()


// --- J. CLIENTS (NEW: DAFTAR KLIEN) ---
export const clientQuery = groq`
  *[_type == "client"] | order(_createdAt desc) {
    name,
    "logo": logo.asset->url
  }
`
export const ClientResponse = z.array(z.object({
  name: z.string().nullish(),
  logo: z.string().nullish(),
})).nullish()