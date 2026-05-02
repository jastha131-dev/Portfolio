'use client'

import { motion } from 'framer-motion'
import type { Skill } from '@/types'

const CATEGORY_CONFIG = {
  frontend: { label: 'Frontend', description: 'Building beautiful interfaces', icon: '◈' },
  backend: { label: 'Backend', description: 'Powering server & APIs', icon: '◎' },
  tools: { label: 'Tools & DevOps', description: 'Workflow & deployment', icon: '◇' },
}

export default function Skills({ data }: { data: Skill[] }) {
  const grouped = data.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {})

  return (
    <section id="skills" className="py-28 relative overflow-hidden section-alt">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 dark:bg-emerald-500/4 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="section-label mb-3">What I Know</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            My <span className="gradient-text">Skills</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {(['frontend', 'backend', 'tools'] as const).map((category, ci) => {
            const config = CATEGORY_CONFIG[category]
            const skills = grouped[category] ?? []
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1, duration: 0.5 }}
                className="glass rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="flex items-start gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-lg flex-shrink-0">
                    {config.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">{config.label}</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{config.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skills.length === 0 ? (
                    <p className="text-slate-400 text-sm">No skills listed.</p>
                  ) : (
                    skills.map((skill, i) => (
                      <motion.div
                        key={skill._id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.06, y: -2 }}
                        transition={{ delay: ci * 0.1 + i * 0.06, type: 'spring', stiffness: 300, damping: 20 }}
                        className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-white/6 text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-emerald-400 dark:hover:border-emerald-500/40 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/5 shadow-sm transition-all cursor-default"
                      >
                        {skill.name}
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
