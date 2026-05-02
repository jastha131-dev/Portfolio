'use client'

import { motion } from 'framer-motion'
import type { Experience as ExperienceType } from '@/types'

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function ExperienceCard({ exp }: { exp: ExperienceType }) {
  return (
    <div className="glass rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300">
      <div className="inline-flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold mb-3 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-full px-3 py-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" aria-hidden="true" />
        {formatDate(exp.startDate)} — {exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : ''}
        {exp.current && <span className="ml-1 text-emerald-500 dark:text-emerald-300">· Current</span>}
      </div>
      <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">{exp.role}</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-4">{exp.company}</p>
      <ul className="space-y-2">
        {exp.bullets?.map((b, bi) => (
          <li key={`${exp._id}-${bi}`} className="flex gap-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <span className="text-emerald-500 mt-0.5 flex-shrink-0" aria-hidden="true">▸</span>
            {b}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Experience({ data }: { data: ExperienceType[] }) {
  if (!data.length) return null

  return (
    <section id="experience" className="py-28 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="section-label mb-3">Career Path</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            My <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div
            className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/40 via-emerald-500/20 to-transparent hidden md:block"
            aria-hidden="true"
          />

          <div className="space-y-10">
            {data.map((exp, i) => (
              <motion.div
                key={exp._id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative md:grid md:grid-cols-2 gap-8"
              >
                <div
                  className="hidden md:block absolute left-1/2 -translate-x-1/2 top-6 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-900 z-10 shadow-lg shadow-emerald-500/40"
                  aria-hidden="true"
                />

                {i % 2 === 0 ? (
                  <>
                    <div className="md:pr-12"><ExperienceCard exp={exp} /></div>
                    <div />
                  </>
                ) : (
                  <>
                    <div />
                    <div className="md:pl-12"><ExperienceCard exp={exp} /></div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
