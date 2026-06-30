# Project Detail Page Design

**Date:** 2026-06-30  
**Status:** Approved

## Overview

Add a dedicated detail page for each portfolio project at `/projects/[slug]`. The page is statically generated at build time using `generateStaticParams`, revalidating every 60 seconds to match the existing Sanity fetch pattern.

## Schema & Data Layer

### New fields added to `sanity/schemas/project.ts`

All fields are optional. UI renders a section only when value is present.

| Field | Type | Purpose |
|-------|------|---------|
| `body` | `array` of `block` (Portable Text) | Long-form rich text write-up |
| `gallery` | `array` of `image` (hotspot + alt) | Additional screenshots |
| `challenges` | `text` | Plain text challenges block |
| `outcomes` | `text` | Plain text outcomes block |
| `role` | `string` | The contributor's role on the project |

### Type changes (`types/index.ts`)

Extend `Project` interface with all new optional fields. Import `PortableTextBlock` from `@portabletext/react` for the `body` field type.

### New GROQ query

`getProjectBySlug(slug: string): Promise<Project | null>` — fetches a single project by `slug.current`, includes all fields including new ones.

`getProjects()` already fetches slugs — used as-is for `generateStaticParams`.

### New package

`@portabletext/react` — renders Sanity Portable Text blocks.

## Page Layout (`/projects/[slug]`)

Inherits root layout (Navbar rendered automatically).

**Top → bottom structure:**

1. **Back button** — `← Back to Projects`, links to `/#projects`
2. **Hero block** — full-width cover image if present, else gradient placeholder matching `ProjectCard` fallback style. Project title + `role` badge overlaid bottom-left.
3. **Two-column content area** (lg: 2/3 + 1/3 split, stacks on mobile):
   - **Left (main):** `body` rich text → `challenges` block → `outcomes` block. Each renders only if filled.
   - **Right (sidebar):** Tech stack badges, GitHub + Live links, featured badge if `featured === true`.
4. **Gallery** — responsive grid of screenshots, framer-motion lightbox expand on click. Renders only if `gallery` has images.
5. **Prev / Next project nav** — bottom of page, two side-by-side cards with arrow icons. Order determined by the `order` field (same as homepage).

**Animations:** fade-in on mount using existing `motion` + `whileInView` patterns. No new animation libraries.

## Files Changed / Created

| File | Action |
|------|--------|
| `sanity/schemas/project.ts` | Add `body`, `gallery`, `challenges`, `outcomes`, `role` fields |
| `types/index.ts` | Extend `Project` with new optional fields |
| `lib/sanity.queries.ts` | Add `getProjectBySlug(slug)` |
| `app/projects/[slug]/page.tsx` | New — server component with `generateStaticParams` + metadata |
| `components/sections/ProjectDetail.tsx` | New — full detail layout component |
| `components/ui/PortableText.tsx` | New — Portable Text renderer with design-system styles |
| `components/sections/ProjectCard.tsx` | Wrap card in `<Link href={/projects/${slug}}>` |

## Error Handling

- `notFound()` called if `getProjectBySlug` returns null (slug doesn't exist)
- Missing optional fields (gallery, body, challenges, outcomes, role) silently omit their sections
- Missing cover image falls back to the same gradient placeholder used in `ProjectCard`

## Non-Goals

- No comments, likes, or social sharing features
- No related projects recommendation algorithm (prev/next is order-based only)
- No animation changes beyond existing framer-motion patterns
