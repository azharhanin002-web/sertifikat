import { defineType, defineArrayMember } from 'sanity'
import { FaPalette, FaLink, FaTextHeight } from 'react-icons/fa' // Tambah FaTextHeight

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
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Underline', value: 'underline'},
        ],
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
          // 2. WARNA TEKS (Yang tadi)
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
                    { title: 'Merah', value: '#dc2626' },
                    { title: 'Biru', value: '#2563eb' },
                    { title: 'Hijau', value: '#16a34a' },
                    { title: 'Hitam', value: '#000000' },
                  ],
                },
              },
            ],
          },
          // 3. UKURAN FONT (BARU! FITUR CUSTOM SIZE)
          {
            name: 'fontSize',
            type: 'object',
            title: 'Ukuran Font',
            icon: FaTextHeight, // Ikon Ukuran Teks
            fields: [
              {
                name: 'size',
                type: 'string',
                title: 'Pilih Ukuran',
                options: {
                  list: [
                    { title: 'Kecil (12px)', value: 'text-xs' },
                    { title: 'Normal (16px)', value: 'text-base' },
                    { title: 'Sedang (18px)', value: 'text-lg' },
                    { title: 'Besar (20px)', value: 'text-xl' },
                    { title: 'Sangat Besar (24px)', value: 'text-2xl' },
                    { title: 'Jumbo (30px)', value: 'text-3xl' },
                    { title: 'Raksasa (36px)', value: 'text-4xl' },
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
})