import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'layanan',
  title: 'Daftar Layanan',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nama Layanan',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({
      name: 'icon',
      title: 'Ikon/Gambar Kecil',
      type: 'image',
    }),
    defineField({
      name: 'shortDesc',
      title: 'Deskripsi Singkat (untuk Card)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'description',
      title: 'Penjelasan Lengkap',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})