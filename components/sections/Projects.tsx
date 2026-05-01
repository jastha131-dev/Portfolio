'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import SkeletonCard from '@/components/ui/SkeletonCard'
import type { Project } from '@/types'

export default function Projects({ data }: { data: Project[] }) {
  const [activeFilter, setActiveFilter] = useState('All')

  const allTechs = [
    'All',
    ...Array.from(new Set(data.flatMap((p) => p.techStack ?? []))).sort(),
  ]
  const filtered =
    activeFilter === 'All'
      ? data
      : data.filter((p) => p.techStack?.includes(activeFilter))

  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-4"
        >
          My <span className="text-emerald-500">Projects</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {allTechs.map((tech) => (
            <button
              key={tech}
              onClick={() => setActiveFilter(tech)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 cursor-pointer ${
                activeFilter === tech
                  ? 'bg-emerald-500 text-white'
                  : 'border border-white/10 text-slate-400 hover:border-emerald-500/50 hover:text-emerald-500'
              }`}
            >
              {tech}
            </button>
          ))}
        </motion.div>

        {data.length === 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
