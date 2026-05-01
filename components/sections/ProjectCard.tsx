'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { urlForImage } from '@/lib/sanity.image'
import type { Project } from '@/types'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group flex flex-col rounded-xl border border-white/10 overflow-hidden bg-slate-800/50 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-colors duration-300 h-full"
    >
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        {project.image ? (
          <Image
            src={urlForImage(project.image).width(600).height(400).url()}
            alt={project.image.alt ?? project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-emerald-500/10 flex items-center justify-center">
            <span className="text-emerald-500/30 text-4xl font-bold select-none">
              {project.title[0]}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 space-y-3 flex flex-col flex-1">
        <h3 className="font-semibold text-lg">{project.title}</h3>
        <p className="text-sm text-slate-400 line-clamp-2 flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.techStack?.map((tech) => <Badge key={tech}>{tech}</Badge>)}
        </div>
        <div className="flex gap-4 pt-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-slate-400 hover:text-emerald-500 transition-colors"
              aria-label="View on GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-slate-400 hover:text-emerald-500 transition-colors"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
