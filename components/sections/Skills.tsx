'use client'

import { motion } from 'framer-motion'
import type { Skill } from '@/types'

const SKILL_ICONS: Record<string, string> = {
  'Next.js': '▲',
  'React.js': '⚛',
  HTML: '🔶',
  CSS: '🎨',
  'Tailwind CSS': '💨',
  'Node.js': '🟢',
  MongoDB: '🍃',
  'REST APIs': '🔗',
  Git: '📦',
  GitHub: '🐙',
  'VS Code': '💻',
  Vercel: '▲',
  Sanity: '🔴',
}

const CATEGORY_LABELS: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'Tools',
}

export default function Skills({ data }: { data: Skill[] }) {
  const grouped = data.reduce<Record<string, Skill[]>>((acc, skill) => {
    const cat = skill.category
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(skill)
    return acc
  }, {})

  return (
    <section id="skills" className="py-24 dark:bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12"
        >
          My <span className="text-emerald-500">Skills</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {(['frontend', 'backend', 'tools'] as const).map((category, ci) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.15 }}
              className="rounded-xl border border-white/10 p-6 bg-slate-800/50"
            >
              <h3 className="text-emerald-500 font-semibold mb-6 text-lg">
                {CATEGORY_LABELS[category]}
              </h3>
              <div className="space-y-4">
                {(grouped[category] ?? []).length === 0 ? (
                  <p className="text-slate-500 text-sm">No skills listed.</p>
                ) : (
                  (grouped[category] ?? []).map((skill, i) => (
                    <motion.div
                      key={skill._id}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: ci * 0.1 + i * 0.08,
                        type: 'spring',
                        stiffness: 200,
                        damping: 20,
                      }}
                      className="flex items-center gap-3"
                    >
                      <span className="text-xl w-7 text-center" aria-hidden="true">
                        {SKILL_ICONS[skill.name] ?? '◆'}
                      </span>
                      <span className="text-sm font-medium">{skill.name}</span>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
