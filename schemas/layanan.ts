import { defineField, defineType, defineArrayMember } from 'sanity'
import { FaBriefcase, FaPalette, FaTextHeight, FaLink } from 'react-icons/fa'

export default defineType({
  name: 'layanan',
  title: 'Layanan Kami',
  type: 'document',
  icon: FaBriefcase,
  fields: [
    defineField({
      name: 'title',
      title: 'Nama Layanan',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDesc',
      title: 'Deskripsi Singkat (Untuk di Halaman Depan)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'icon',
      title: 'Gambar / Ikon Layanan',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    
    // --- KONFIGURASI EDITOR LENGKAP (WARNA & FONT) ---
    defineField({
      name: 'description',
      title: 'Deskripsi Lengkap',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1 (Judul Besar)', value: 'h1'},
            {title: 'H2 (Judul Sedang)', value: 'h2'},
            {title: 'H3 (Judul Kecil)', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Number', value: 'number'}
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
            ],
            annotations: [
              // 1. LINK URL
              {
                title: 'URL Link',
                name: 'link',
                type: 'object',
                icon: FaLink,
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
              // 2. WARNA TEKS (PALET)
              {
                name: 'textColor',
                type: 'object',
                title: 'Warna Teks',
                icon: FaPalette,
                fields: [
                  {
                    name: 'color',
                    type: 'string',
                    title: 'Pilih Warna',
                    options: {
                      list: [
                        { title: 'Merah (Red)', value: '#dc2626' },
                        { title: 'Biru (Blue)', value: '#2563eb' },
                        { title: 'Hijau (Green)', value: '#16a34a' },
                        { title: 'Kuning Emas', value: '#d97706' },
                        { title: 'Hitam', value: '#000000' },
                        { title: 'Abu-abu', value: '#4b5563' },
                      ],
                    },
                  },
                ],
              },
              // 3. UKURAN FONT (BESAR/KECIL)
              {
                name: 'fontSize',
                type: 'object',
                title: 'Ukuran Font',
                icon: FaTextHeight,
                fields: [
                  {
                    name: 'size',
                    type: 'string',
                    title: 'Pilih Ukuran',
                    options: {
                      list: [
                        { title: 'Kecil (Small)', value: 'text-sm' },
                        { title: 'Normal', value: 'text-base' },
                        { title: 'Sedang (Medium)', value: 'text-xl' },
                        { title: 'Besar (Large)', value: 'text-2xl' },
                        { title: 'Jumbo (Extra Large)', value: 'text-4xl' },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
  ],
})