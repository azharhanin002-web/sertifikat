import { defineType, defineField } from 'sanity';
import { FaBuilding } from 'react-icons/fa';

export default defineType({
  name: 'client',
  title: 'Daftar Klien',
  type: 'document',
  icon: FaBuilding,
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Perusahaan',
      type: 'string',
      validation: (Rule) => Rule.required(), // Wajib diisi agar list rapi
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