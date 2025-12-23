import { defineField, defineType } from 'sanity'
import { FaBullhorn } from 'react-icons/fa'

export default defineType({
  name: 'promo',
  title: 'Promo Spesial',
  type: 'document',
  icon: FaBullhorn,
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Promo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    // --- FITUR AUTO GENERATE SLUG ---
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title', // <--- Ini kuncinya agar otomatis generate dari title
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    // --------------------------------
    defineField({
      name: 'image',
      title: 'Gambar Promo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        })
      ]
    }),
    defineField({
      name: 'period',
      title: 'Periode Promo (Contoh: 1 - 31 Januari 2025)',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Lengkap',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'period',
      media: 'image',
    },
  },
})