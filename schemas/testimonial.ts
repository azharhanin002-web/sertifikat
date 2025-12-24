import { defineType, defineField } from 'sanity';
import { FaQuoteLeft } from 'react-icons/fa';

export default defineType({
  name: 'testimonial',
  title: 'Testimoni',
  type: 'document',
  icon: FaQuoteLeft,
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Klien',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Jabatan / Perusahaan', // Misal: CEO PT Maju Mundur
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Isi Testimoni',
      type: 'text',
    }),
    defineField({
      name: 'photo',
      title: 'Foto Klien',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'rating',
      title: 'Rating (Bintang)',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(5),
    }),
  ],
});