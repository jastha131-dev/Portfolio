import { defineField, defineType } from 'sanity'

export const aboutSchema = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'bio',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'profileImage',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string' }),
      ],
    }),
    defineField({ name: 'cvUrl', type: 'url' }),
    defineField({ name: 'location', type: 'string' }),
  ],
})
