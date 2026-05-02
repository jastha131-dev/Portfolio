'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
    <section id="projects" className="py-28 relative overflow-hidden">
      <div className="absolute left-0 top-1/3 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="section-label mb-3">What I&apos;ve Built</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            My <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {allTechs.map((tech) => (
            <motion.button
              key={tech}
              onClick={() => setActiveFilter(tech)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeFilter === tech
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                  : 'border border-white/10 text-slate-400 hover:border-emerald-500/40 hover:text-emerald-400 bg-slate-800/30'
              }`}
            >
              {tech}
            </motion.button>
          ))}
        </motion.div>

        {data.length === 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-slate-400 text-sm py-12 text-center"
          >
            No projects match this filter.
          </motion.p>
        ) : (
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: Math.min(i * 0.08, 0.3), duration: 0.3 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  )
}
