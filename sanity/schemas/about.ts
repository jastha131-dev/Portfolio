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
    defineField({ name: 'cvUrl', title: 'CV URL', type: 'url' }),
    defineField({ name: 'location', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'whatsappNumber', title: 'WhatsApp Number (international, no +)', type: 'string' }),
    defineField({ name: 'githubUrl', title: 'GitHub URL', type: 'url' }),
    defineField({ name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'yearsExperience', title: 'Years Experience (e.g. 3+)', type: 'string' }),
    defineField({ name: 'projectsCount', title: 'Projects Count (e.g. 20+)', type: 'string' }),
    defineField({ name: 'technologiesCount', title: 'Technologies Count (e.g. 15+)', type: 'string' }),
  ],
})
