import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '1vu0vfyp'
const token = process.env.SANITY_WRITE_TOKEN

if (!token) {
  console.error('ERROR: Set SANITY_WRITE_TOKEN env var (Editor token from manage.sanity.io)')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

async function seed() {
  console.log('Seeding Sanity project:', projectId)

  // About
  await client.createOrReplace({
    _id: 'about-singleton',
    _type: 'about',
    bio: "Hi! I'm Astha Jain, a Web Developer & Designer based in Dubai. I specialize in building modern, performant web applications with Next.js, React, and Node.js. Passionate about clean code, great UX, and turning ideas into real products.",
    location: 'Dubai',
  })
  console.log('✓ About created')

  // Skills
  const skills = [
    { name: 'Next.js',     category: 'frontend', order: 1 },
    { name: 'React.js',    category: 'frontend', order: 2 },
    { name: 'HTML',        category: 'frontend', order: 3 },
    { name: 'CSS',         category: 'frontend', order: 4 },
    { name: 'Tailwind CSS',category: 'frontend', order: 5 },
    { name: 'Node.js',     category: 'backend',  order: 1 },
    { name: 'MongoDB',     category: 'backend',  order: 2 },
    { name: 'REST APIs',   category: 'backend',  order: 3 },
    { name: 'Git',         category: 'tools',    order: 1 },
    { name: 'GitHub',      category: 'tools',    order: 2 },
    { name: 'VS Code',     category: 'tools',    order: 3 },
    { name: 'Vercel',      category: 'tools',    order: 4 },
  ]
  for (const skill of skills) {
    await client.createOrReplace({
      _id: `skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      _type: 'skill',
      ...skill,
    })
  }
  console.log('✓ 12 skills created')

  // Projects
  const projects = [
    {
      _id: 'project-taskflow',
      _type: 'project',
      title: 'TaskFlow',
      slug: { _type: 'slug', current: 'taskflow' },
      description: 'A full-stack project management app with real-time task tracking, team collaboration, and progress dashboards.',
      techStack: ['React', 'Node.js', 'MongoDB'],
      githubUrl: 'https://github.com/jastha131-dev',
      liveUrl: 'https://github.com/jastha131-dev',
      featured: true,
      order: 1,
    },
    {
      _id: 'project-shopnext',
      _type: 'project',
      title: 'ShopNext',
      slug: { _type: 'slug', current: 'shopnext' },
      description: 'A modern e-commerce storefront with product listings, cart management, and checkout flow built on Next.js.',
      techStack: ['Next.js', 'MongoDB'],
      githubUrl: 'https://github.com/jastha131-dev',
      liveUrl: 'https://github.com/jastha131-dev',
      featured: false,
      order: 2,
    },
    {
      _id: 'project-devblog',
      _type: 'project',
      title: 'DevBlog',
      slug: { _type: 'slug', current: 'devblog' },
      description: 'A developer blog platform with markdown support, syntax highlighting, and tag-based filtering.',
      techStack: ['Next.js', 'React'],
      githubUrl: 'https://github.com/jastha131-dev',
      liveUrl: 'https://github.com/jastha131-dev',
      featured: false,
      order: 3,
    },
  ]
  for (const project of projects) {
    await client.createOrReplace(project)
  }
  console.log('✓ 3 projects created')

  // Experience
  await client.createOrReplace({
    _id: 'experience-1',
    _type: 'experience',
    role: 'Web Developer',
    company: 'California Media UAE',
    startDate: '2023-01-01',
    current: true,
    bullets: [
      'Built and maintained client websites using Next.js and React',
      'Designed responsive UI components with Tailwind CSS',
      'Integrated CMS solutions for dynamic content management',
      'Collaborated with design team to deliver pixel-perfect implementations',
    ],
    order: 1,
  })
  console.log('✓ Experience created')

  console.log('\nSeed complete! Visit http://localhost:3000 to see your portfolio.')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
