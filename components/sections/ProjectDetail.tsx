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
