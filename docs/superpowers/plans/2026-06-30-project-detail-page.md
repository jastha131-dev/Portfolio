# Project Detail Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a statically-generated `/projects/[slug]` detail page with rich content, gallery lightbox, and prev/next project navigation.

**Architecture:** Server component at `app/projects/[slug]/page.tsx` fetches project data + all projects (for prev/next), passes to a `'use client'` `ProjectDetail` component that handles animations and gallery lightbox state. New Sanity schema fields are all optional — sections only render when content is present.

**Tech Stack:** Next.js 16 App Router (ISR), Sanity GROQ, `@portabletext/react`, framer-motion, TailwindCSS 4, TypeScript

## Global Constraints

- `params` in Next.js 16 App Router is `Promise<{ slug: string }>` — always `await params` before accessing `.slug`
- `export const revalidate = 60` on the page (matches existing Sanity fetch pattern)
- All new Sanity schema fields are optional — never assume they are filled
- Follow existing design tokens: `emerald-500` accent, `gradient-text`, `section-label`, `glass`, `section-alt` CSS classes
- TypeScript strict mode — no `any`, all props typed
- Framer-motion used in `'use client'` components only (matches existing pattern in `ProjectCard`, `Projects`)
- Import from `@portabletext/types` for `PortableTextBlock` type
- No test framework exists — use `npx tsc --noEmit` for type verification and `npm run dev` for visual verification

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `sanity/schemas/project.ts` | Modify | Add `role`, `body`, `gallery`, `challenges`, `outcomes` fields |
| `types/index.ts` | Modify | Add optional new fields to `Project` interface |
| `lib/sanity.queries.ts` | Modify | Add `getProjectBySlug(slug)` function |
| `components/ui/PortableText.tsx` | Create | Styled Portable Text renderer using `@portabletext/react` |
| `components/sections/ProjectDetail.tsx` | Create | `'use client'` detail layout: hero, content, gallery, prev/next |
| `app/projects/[slug]/page.tsx` | Create | Server component: `generateStaticParams`, `generateMetadata`, data fetching |
| `components/sections/ProjectCard.tsx` | Modify | Wrap card in Link to `/projects/[slug]` |

---

### Task 1: Extend Sanity project schema

**Files:**
- Modify: `sanity/schemas/project.ts`

**Interfaces:**
- Produces: Sanity schema with 5 new optional fields available in Studio

- [ ] **Step 1: Add new fields to project schema**

Replace the contents of `sanity/schemas/project.ts` with:

```typescript
import { defineField, defineType } from 'sanity'

export const projectSchema = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({ name: 'description', type: 'text' }),
    defineField({ name: 'role', title: 'Your Role', type: 'string' }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({ name: 'challenges', title: 'Challenges', type: 'text' }),
    defineField({ name: 'outcomes', title: 'Outcomes', type: 'text' }),
    defineField({
      name: 'techStack',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'githubUrl', type: 'url' }),
    defineField({ name: 'liveUrl', type: 'url' }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', type: 'number' }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
```

- [ ] **Step 2: Type-check**

```bash
cd /Users/californiamediadubai/Desktop/test/dev-test/portfolio
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add sanity/schemas/project.ts
git commit -m "feat(schema): add body, gallery, challenges, outcomes, role to project"
```

---

### Task 2: Extend TypeScript types and add GROQ query

**Files:**
- Modify: `types/index.ts`
- Modify: `lib/sanity.queries.ts`

**Interfaces:**
- Consumes: Sanity schema from Task 1
- Produces:
  - `Project` interface with optional `role?: string`, `body?: PortableTextBlock[]`, `challenges?: string`, `outcomes?: string`, `gallery?: SanityImage[]`
  - `getProjectBySlug(slug: string): Promise<Project | null>`

- [ ] **Step 1: Extend Project interface in `types/index.ts`**

Replace the entire file:

```typescript
import type { PortableTextBlock } from '@portabletext/types'

export interface SanityImage {
  asset: { _ref: string }
  alt?: string
}

export interface Project {
  _id: string
  title: string
  slug: { current: string }
  description: string
  image?: SanityImage
  techStack: string[]
  githubUrl: string
  liveUrl: string
  featured: boolean
  role?: string
  body?: PortableTextBlock[]
  challenges?: string
  outcomes?: string
  gallery?: SanityImage[]
}

export interface About {
  bio: string
  profileImage: SanityImage
  cvUrl?: string
  location: string
  email?: string
  whatsappNumber?: string
  githubUrl?: string
  linkedinUrl?: string
  yearsExperience?: string
  projectsCount?: string
  technologiesCount?: string
}

export interface Skill {
  _id: string
  name: string
  category: 'frontend' | 'backend' | 'tools'
}

export interface Experience {
  _id: string
  role: string
  company: string
  startDate: string
  endDate?: string
  current: boolean
  bullets: string[]
}
```

- [ ] **Step 2: Add `getProjectBySlug` to `lib/sanity.queries.ts`**

Replace the entire file:

```typescript
import { client } from './sanity.client'
import type { Project, About, Skill, Experience } from '@/types'

const revalidate = { next: { revalidate: 60 } }

export async function getProjects(): Promise<Project[]> {
  return client.fetch(
    `*[_type == "project"] | order(order asc) {
      _id, title, slug, description, image, techStack, githubUrl, liveUrl, featured
    }`,
    {},
    revalidate,
  )
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return client.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      _id, title, slug, description, image, techStack, githubUrl, liveUrl, featured,
      role, body, challenges, outcomes, gallery
    }`,
    { slug },
    revalidate,
  )
}

export async function getAbout(): Promise<About | null> {
  return client.fetch(
    `*[_type == "about"][0] {
      bio, profileImage, cvUrl, location,
      email, whatsappNumber, githubUrl, linkedinUrl,
      yearsExperience, projectsCount, technologiesCount
    }`,
    {},
    revalidate,
  )
}

export async function getSkills(): Promise<Skill[]> {
  return client.fetch(
    `*[_type == "skill"] | order(order asc) { _id, name, category }`,
    {},
    revalidate,
  )
}

export async function getExperience(): Promise<Experience[]> {
  return client.fetch(
    `*[_type == "experience"] | order(order asc) {
      _id, role, company, startDate, endDate, current, bullets
    }`,
    {},
    revalidate,
  )
}
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add types/index.ts lib/sanity.queries.ts
git commit -m "feat(types): extend Project with detail fields, add getProjectBySlug query"
```

---

### Task 3: Create PortableText renderer component

**Files:**
- Create: `components/ui/PortableText.tsx`

**Interfaces:**
- Consumes: `Project.body: PortableTextBlock[]` from Task 2
- Produces: `PortableTextRenderer({ value: PortableTextBlock[] })` — styled rich text output matching design system

- [ ] **Step 1: Create `components/ui/PortableText.tsx`**

```tsx
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

const components = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mt-6 mb-3">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-slate-500 dark:text-slate-400 my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-inside space-y-1 mb-4 text-slate-600 dark:text-slate-300">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside space-y-1 mb-4 text-slate-600 dark:text-slate-300">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-slate-900 dark:text-white">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => <em>{children}</em>,
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm font-mono text-emerald-600 dark:text-emerald-400">
        {children}
      </code>
    ),
    link: ({ value, children }: { value?: { href?: string }; children?: React.ReactNode }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-emerald-500 hover:underline"
      >
        {children}
      </a>
    ),
  },
}

export default function PortableTextRenderer({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/ui/PortableText.tsx
git commit -m "feat(ui): add PortableText renderer with design-system styles"
```

---

### Task 4: Create ProjectDetail component

**Files:**
- Create: `components/sections/ProjectDetail.tsx`

**Interfaces:**
- Consumes:
  - `project: Project` (full project with optional rich fields)
  - `prevProject: Project | null`
  - `nextProject: Project | null`
  - `urlForImage` from `@/lib/sanity.image`
  - `PortableTextRenderer` from `@/components/ui/PortableText`
- Produces: `ProjectDetail({ project, prevProject, nextProject })` — full detail page layout

- [ ] **Step 1: Create `components/sections/ProjectDetail.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ExternalLink, X } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import PortableTextRenderer from '@/components/ui/PortableText'
import { urlForImage } from '@/lib/sanity.image'
import type { Project } from '@/types'

interface Props {
  project: Project
  prevProject: Project | null
  nextProject: Project | null
}

export default function ProjectDetail({ project, prevProject, nextProject }: Props) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)

  return (
    <main className="min-h-screen">
      {/* Back button */}
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors font-medium group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          Back to Projects
        </Link>
      </div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-72 md:h-96 mt-6 overflow-hidden"
      >
        {project.image ? (
          <>
            <Image
              src={urlForImage(project.image).width(1200).height(600).url()}
              alt={project.image.alt ?? project.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, rgba(16,185,129,0.4) 1px, transparent 0)',
                backgroundSize: '20px 20px',
              }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-6xl mx-auto">
          {project.role && (
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
              {project.role}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-bold text-white">{project.title}</h1>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-10"
          >
            {/* Description (always shown) */}
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.description}
            </p>

            {/* Rich text body */}
            {project.body && project.body.length > 0 && (
              <div>
                <p className="section-label mb-4">Overview</p>
                <PortableTextRenderer value={project.body} />
              </div>
            )}

            {/* Challenges */}
            {project.challenges && (
              <div>
                <p className="section-label mb-4">Challenges</p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {project.challenges}
                </p>
              </div>
            )}

            {/* Outcomes */}
            {project.outcomes && (
              <div>
                <p className="section-label mb-4">Outcomes</p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {project.outcomes}
                </p>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Tech stack */}
            {project.techStack?.length > 0 && (
              <div className="rounded-2xl border border-slate-200 dark:border-white/8 p-6 bg-white dark:bg-slate-800/40">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-4">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            {(project.githubUrl || project.liveUrl) && (
              <div className="rounded-2xl border border-slate-200 dark:border-white/8 p-6 bg-white dark:bg-slate-800/40 space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-4">
                  Links
                </p>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-emerald-500 transition-colors font-medium"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    View Source Code
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-emerald-500 transition-colors font-medium"
                  >
                    <ExternalLink size={16} aria-hidden="true" />
                    Live Demo
                  </a>
                )}
              </div>
            )}

            {/* Featured badge */}
            {project.featured && (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">
                  Featured Project
                </span>
              </div>
            )}
          </motion.aside>
        </div>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16"
          >
            <p className="section-label mb-6">Gallery</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.gallery.map((img, i) => {
                const src = urlForImage(img).width(800).height(500).url()
                return (
                  <button
                    key={i}
                    onClick={() => setLightboxSrc(src)}
                    className="relative aspect-video rounded-xl overflow-hidden group cursor-zoom-in border border-slate-200 dark:border-white/8 hover:border-emerald-500/40 transition-colors"
                    aria-label={`View image ${i + 1}`}
                  >
                    <Image
                      src={src}
                      alt={img.alt ?? `${project.title} screenshot ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Prev / Next navigation */}
        {(prevProject || nextProject) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 pt-10 border-t border-slate-200 dark:border-white/8 grid grid-cols-2 gap-4"
          >
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug.current}`}
                className="group flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-white/8 p-4 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 bg-white dark:bg-slate-800/40"
              >
                <ArrowLeft size={18} className="text-slate-400 group-hover:text-emerald-500 transition-colors flex-shrink-0 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-xs text-slate-400 mb-0.5">Previous</p>
                  <p className="font-semibold text-sm truncate group-hover:text-emerald-500 transition-colors">
                    {prevProject.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug.current}`}
                className="group flex items-center justify-end gap-3 rounded-2xl border border-slate-200 dark:border-white/8 p-4 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 bg-white dark:bg-slate-800/40 text-right"
              >
                <div className="min-w-0">
                  <p className="text-xs text-slate-400 mb-0.5">Next</p>
                  <p className="font-semibold text-sm truncate group-hover:text-emerald-500 transition-colors">
                    {nextProject.title}
                  </p>
                </div>
                <ArrowRight size={18} className="text-slate-400 group-hover:text-emerald-500 transition-colors flex-shrink-0 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            ) : (
              <div />
            )}
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightboxSrc(null)}
          >
            <button
              onClick={() => setLightboxSrc(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl max-h-[90vh] w-full aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxSrc}
                alt="Gallery image"
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/sections/ProjectDetail.tsx
git commit -m "feat(components): add ProjectDetail with hero, content, gallery, prev/next"
```

---

### Task 5: Create project detail page route

**Files:**
- Create: `app/projects/[slug]/page.tsx`

**Interfaces:**
- Consumes:
  - `getProjectBySlug(slug: string): Promise<Project | null>` from Task 2
  - `getProjects(): Promise<Project[]>` from existing `lib/sanity.queries`
  - `ProjectDetail({ project, prevProject, nextProject })` from Task 4
- Produces: statically-generated `/projects/[slug]` page with ISR at 60s

- [ ] **Step 1: Create `app/projects/[slug]/page.tsx`**

```tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProjectBySlug, getProjects } from '@/lib/sanity.queries'
import ProjectDetail from '@/components/sections/ProjectDetail'

export const revalidate = 60

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((p) => ({ slug: p.slug.current }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: `${project.title} — Astha Jain`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Astha Jain`,
      description: project.description,
      type: 'website',
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
  ])

  if (!project) notFound()

  const idx = allProjects.findIndex((p) => p.slug.current === slug)
  const prevProject = idx > 0 ? allProjects[idx - 1] : null
  const nextProject = idx < allProjects.length - 1 ? allProjects[idx + 1] : null

  return (
    <ProjectDetail
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Smoke-test in dev**

```bash
npm run dev
```

Navigate to `http://localhost:3000/projects/<any-slug>` (or if no projects in Sanity yet, check that `http://localhost:3000/projects/nonexistent` returns a 404 page).

- [ ] **Step 4: Commit**

```bash
git add app/projects/
git commit -m "feat(pages): add static project detail page with generateStaticParams and ISR"
```

---

### Task 6: Wire ProjectCard to link to detail page

**Files:**
- Modify: `components/sections/ProjectCard.tsx`

**Interfaces:**
- Consumes: `project.slug.current` (already on `Project` type)
- Produces: Clicking card title/image navigates to `/projects/[slug]`. GitHub and Live Demo links still work independently.

- [ ] **Step 1: Add link overlay to `components/sections/ProjectCard.tsx`**

Replace the full file:

```tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { urlForImage } from '@/lib/sanity.image'
import type { Project } from '@/types'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative flex flex-col rounded-2xl border border-slate-200 dark:border-white/8 overflow-hidden bg-white dark:bg-slate-800/40 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 h-full"
    >
      {/* Full-card link — sits behind interactive elements */}
      <Link
        href={`/projects/${project.slug.current}`}
        className="absolute inset-0 z-0"
        aria-label={`View ${project.title} details`}
      />

      <div className="relative h-48 overflow-hidden flex-shrink-0 bg-gradient-to-br from-slate-800 to-slate-900">
        {project.image ? (
          <>
            <Image
              src={urlForImage(project.image).width(600).height(400).url()}
              alt={project.image.alt ?? project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-slate-800 to-cyan-900/30" />
            <div
              className="absolute inset-0 opacity-20"
              style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(16,185,129,0.4) 1px, transparent 0)', backgroundSize: '20px 20px' }}
              aria-hidden="true"
            />
            <div className="relative text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold gradient-text select-none">{project.title[0]}</span>
              </div>
              <span className="text-xs text-slate-400 font-medium">{project.title}</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 space-y-4 flex flex-col flex-1">
        <div>
          <h3 className="font-bold text-lg group-hover:text-emerald-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 flex-1">
          {project.techStack?.map((tech) => <Badge key={tech}>{tech}</Badge>)}
        </div>

        <div className="relative z-10 flex gap-4 pt-2 border-t border-slate-100 dark:border-white/5">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors font-medium"
              aria-label="View on GitHub"
              onClick={(e) => e.stopPropagation()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              Source Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={14} aria-hidden="true" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Smoke-test in dev**

```bash
npm run dev
```

1. Navigate to `http://localhost:3000` → Projects section
2. Click a project card (not the GitHub/Live links) → should navigate to `/projects/[slug]`
3. Verify GitHub and Live Demo links still open in a new tab without navigating away
4. Verify "Back to Projects" link returns to `/#projects`
5. Verify prev/next nav cards appear (if multiple projects exist)

- [ ] **Step 4: Commit**

```bash
git add components/sections/ProjectCard.tsx
git commit -m "feat(components): link project card to detail page"
```

---

## Self-Review

**Spec coverage check:**
- ✅ New Sanity fields: body, gallery, challenges, outcomes, role — Task 1
- ✅ TypeScript types extended — Task 2
- ✅ `getProjectBySlug` query — Task 2
- ✅ Static generation with `generateStaticParams` — Task 5
- ✅ ISR 60s revalidation — Task 5 (`export const revalidate = 60`)
- ✅ `generateMetadata` for SEO — Task 5
- ✅ `notFound()` for missing slugs — Task 5
- ✅ Hero block with image/fallback + title + role — Task 4
- ✅ Back button → `/#projects` — Task 4
- ✅ Two-column layout (2/3 + 1/3) — Task 4
- ✅ Conditional rendering of body/challenges/outcomes — Task 4
- ✅ Sidebar: tech stack, links, featured badge — Task 4
- ✅ Gallery with lightbox — Task 4
- ✅ Prev/next navigation ordered by `order` field — Task 5 + Task 4
- ✅ PortableText renderer with design-system styles — Task 3
- ✅ ProjectCard links to detail page — Task 6
- ✅ Inner links (GitHub/Live) still work — Task 6 (z-10 + stopPropagation)

**Placeholder scan:** None found.

**Type consistency:**
- `Project` type defined in Task 2, consumed in Tasks 3, 4, 5, 6 — consistent
- `getProjectBySlug(slug: string): Promise<Project | null>` defined in Task 2, used in Task 5 — consistent
- `ProjectDetail({ project, prevProject, nextProject })` defined in Task 4, used in Task 5 — consistent
- `PortableTextRenderer({ value: PortableTextBlock[] })` defined in Task 3, used in Task 4 — consistent
