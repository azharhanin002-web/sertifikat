import { defineType, defineField } from 'sanity';
import { FaAddressBook } from 'react-icons/fa';

export default defineType({
  name: 'contact',
  title: 'Daftar Kontak',
  type: 'document',
  icon: FaAddressBook,
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Kontak', // Misal: Kantor Pusat, Cabang Jakarta
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Alamat Lengkap',
      type: 'text',
    }),
    defineField({
      name: 'phone',
      title: 'Nomor Telepon',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'mapsUrl',
      title: 'Google Maps Embed URL',
      type: 'url',
      description: 'Link embed dari Google Maps (src)',
    }),
  ],
});