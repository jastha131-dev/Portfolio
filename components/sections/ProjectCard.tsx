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
