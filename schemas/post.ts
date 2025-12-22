import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Berita / Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Berita',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug (Link URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Tanggal Terbit',
      type: 'date', // atau datetime
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Pendirian Badan Usaha', value: 'Pendirian Badan Usaha' },
          { title: 'Sertifikasi', value: 'Sertifikasi' },
          { title: 'Angkutan B3', value: 'Angkutan B3' },
        ],
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Gambar Utama',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'excerpt',
      title: 'Ringkasan Singkat',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Isi Berita',
      type: 'array', 
      of: [{type: 'block'}], // Rich text editor
    }),
  ],
})