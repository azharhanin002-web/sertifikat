import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'promo',
  title: 'Promo Spesial',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Promo',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Banner Promo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'period',
      title: 'Periode Promo (Cth: 1-30 Januari 2025)',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Syarat & Ketentuan',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})