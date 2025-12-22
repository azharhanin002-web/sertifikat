import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'dokumen',
  title: 'File Download',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nama Dokumen',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
            // --- KATEGORI UTAMA (SESUAI MENU WEBSITE) ---
            {title: 'Legalitas', value: 'Legalitas'},
            {title: 'KBLI 2020', value: 'KBLI 2020'},
            
            // --- KATEGORI TAMBAHAN (OPSIONAL) ---
            {title: 'Formulir', value: 'Formulir'},
            {title: 'Regulasi', value: 'Regulasi'},
            {title: 'Panduan', value: 'Panduan'},
        ]
      }
    }),
    defineField({
      name: 'file',
      title: 'Upload File (PDF/Doc)',
      type: 'file',
    }),
  ],
})