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
