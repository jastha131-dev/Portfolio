import { defineField, defineType } from 'sanity'

export const skillSchema = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          { title: 'Frontend', value: 'frontend' },
          { title: 'Backend', value: 'backend' },
          { title: 'Tools', value: 'tools' },
        ],
      },
    }),
    defineField({ name: 'order', type: 'number' }),
  ],
})
