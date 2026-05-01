'use client'

import { motion } from 'framer-motion'
import type { Experience as ExperienceType } from '@/types'

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

export default function Experience({ data }: { data: ExperienceType[] }) {
  if (!data.length) return null

  return (
    <section id="experience" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12"
        >
          My <span className="text-emerald-500">Experience</span>
        </motion.h2>

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-emerald-500/20 hidden md:block" aria-hidden="true" />

          <div className="space-y-12">
            {data.map((exp, i) => (
              <motion.div
                key={exp._id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="relative md:grid md:grid-cols-2 gap-8"
              >
                <div
                  className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 w-4 h-4 rounded-full bg-emerald-500 border-4 border-slate-900 z-10"
                  aria-hidden="true"
                />

                {i % 2 === 0 ? (
                  <>
                    <div className="md:text-right md:pr-12">
                      <div className="inline-block rounded-xl border border-white/10 p-6 bg-slate-800/50">
                        <div className="text-xs text-emerald-500 mb-1">
                          {formatDate(exp.startDate)} —{' '}
                          {exp.current
                            ? 'Present'
                            : exp.endDate
                              ? formatDate(exp.endDate)
                              : ''}
                        </div>
                        <h3 className="font-semibold text-lg">{exp.role}</h3>
                        <p className="text-slate-400 text-sm mb-3">
                          {exp.company}
                        </p>
                        <ul className="space-y-1">
                          {exp.bullets?.map((b, bi) => (
                            <li key={`${exp._id}-${bi}`} className="text-sm text-slate-300">
                              • {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div />
                  </>
                ) : (
                  <>
                    <div />
                    <div className="md:pl-12">
                      <div className="inline-block rounded-xl border border-white/10 p-6 bg-slate-800/50">
                        <div className="text-xs text-emerald-500 mb-1">
                          {formatDate(exp.startDate)} —{' '}
                          {exp.current
                            ? 'Present'
                            : exp.endDate
                              ? formatDate(exp.endDate)
                              : ''}
                        </div>
                        <h3 className="font-semibold text-lg">{exp.role}</h3>
                        <p className="text-slate-400 text-sm mb-3">
                          {exp.company}
                        </p>
                        <ul className="space-y-1">
                          {exp.bullets?.map((b, bi) => (
                            <li key={`${exp._id}-${bi}`} className="text-sm text-slate-300">
                              • {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
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
