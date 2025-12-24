import { defineField, defineType } from 'sanity'
import { FaInfoCircle } from 'react-icons/fa'

export default defineType({
  name: 'about',
  title: 'Tentang Kami',
  type: 'document',
  icon: FaInfoCircle,
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Halaman',
      type: 'string',
      initialValue: 'Tentang Kami',
    }),
    defineField({
      name: 'heroImage',
      title: 'Gambar Hero / Banner',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'overview',
      title: 'Sekilas Perusahaan (Deskripsi Utama)',
      type: 'array', 
      of: [{ type: 'block' }] // Rich Text
    }),
    defineField({
      name: 'vision',
      title: 'Visi',
      type: 'text',
    }),
    defineField({
      name: 'mission',
      title: 'Misi',
      type: 'array',
      of: [{ type: 'string' }], // List of strings
    }),
    defineField({
      name: 'ceoName',
      title: 'Nama Pimpinan / CEO',
      type: 'string',
    }),
    defineField({
      name: 'ceoMessage',
      title: 'Pesan Pimpinan',
      type: 'text',
    }),
    defineField({
      name: 'ceoImage',
      title: 'Foto Pimpinan',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})