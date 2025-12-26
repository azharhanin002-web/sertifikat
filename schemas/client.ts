import { defineType, defineField } from 'sanity';
import { FaBuilding } from 'react-icons/fa';
// Import helper dari plugin
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';

export default defineType({
  name: 'client',
  title: 'Daftar Klien',
  type: 'document',
  icon: FaBuilding,
  // Tambahkan pengaturan ordering ini
  orderings: [orderRankOrdering], 
  fields: [
    // Tambahkan field wajib ini (hidden di studio, tapi penting utk sistem)
    orderRankField({ type: "client" }),

    defineField({
      name: 'name',
      title: 'Nama Perusahaan',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo Perusahaan',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload logo format PNG (transparan) atau JPG.',
    }),
  ],
});