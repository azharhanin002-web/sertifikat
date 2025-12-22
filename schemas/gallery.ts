import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Galeri Kegiatan',
  type: 'document',
  fields: [
    defineField({
      name: 'caption',
      title: 'Keterangan Foto',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Foto Kegiatan',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})