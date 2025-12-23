import { defineType, defineArrayMember } from 'sanity'
import { FaPalette, FaLink } from 'react-icons/fa'

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Number', value: 'number'}
      ],
      marks: {
        // Decorators sederhana (Bold, Italic, dll)
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Underline', value: 'underline'},
        ],
        // Annotations (Fitur lebih kompleks dengan input data)
        annotations: [
          // 1. Link URL
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
          // 2. PILIHAN WARNA TEKS (BANYAK WARNA)
          {
            name: 'textColor',
            type: 'object',
            title: 'Warna Teks',
            icon: FaPalette, // Ikon Palet Lukis
            fields: [
              {
                name: 'color',
                type: 'string',
                title: 'Pilih Warna',
                options: {
                  list: [
                    // Daftar Warna yang Anda inginkan
                    { title: 'Merah (Red)', value: '#dc2626' },
                    { title: 'Biru (Blue)', value: '#2563eb' },
                    { title: 'Hijau (Green)', value: '#16a34a' },
                    { title: 'Kuning Emas (Gold)', value: '#d97706' },
                    { title: 'Ungu (Purple)', value: '#9333ea' },
                    { title: 'Pink', value: '#db2777' },
                    { title: 'Abu-abu (Grey)', value: '#4b5563' },
                    { title: 'Hitam (Black)', value: '#000000' },
                    { title: 'Biru Dongker (Navy)', value: '#1e2338' },
                  ],
                },
              },
            ],
          },
        ],
      },
    }),
    // Support Gambar di tengah teks
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})