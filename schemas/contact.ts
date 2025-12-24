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
      title: 'Nama Cabang / Kabupaten', 
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Alamat Lengkap',
      type: 'text',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Nomor WhatsApp (Cth: 628xxx)',
      type: 'string',
    }),
  ],
});