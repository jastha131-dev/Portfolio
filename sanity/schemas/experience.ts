import { defineField, defineType } from 'sanity'

export const experienceSchema = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'role',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'endDate', type: 'date' }),
    defineField({
      name: 'current',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'bullets',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'order', type: 'number' }),
  ],
})
