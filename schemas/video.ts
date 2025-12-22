import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'videoDoc',
  title: 'Video Dokumentasi',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Video',
      type: 'string',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Cover/Thumbnail Video',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'Link YouTube',
      type: 'url',
    }),
  ],
})