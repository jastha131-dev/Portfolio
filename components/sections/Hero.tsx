'use client'

import { motion } from 'framer-motion'
import { useTypewriter } from '@/hooks/useTypewriter'
import Button from '@/components/ui/Button'
import type { About } from '@/types'

const titles = ['Web Developer', 'UI Designer', 'Full Stack Developer']

const orbitItems = [
  { name: 'Next.js', icon: '▲', angle: 0 },
  { name: 'React', icon: '⚛', angle: 90 },
  { name: 'Node.js', icon: '⬡', angle: 180 },
  { name: 'MongoDB', icon: '◉', angle: 270 },
]

export default function Hero({ about }: { about: About | null }) {
  const typed = useTypewriter(titles)

  const stats = [
    { value: about?.yearsExperience ?? '3+', label: 'Years Exp.' },
    { value: about?.projectsCount ?? '20+', label: 'Projects' },
    { value: about?.technologiesCount ?? '15+', label: 'Technologies' },
  ]

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 hero-grid" aria-hidden="true" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 left-1/6 w-80 h-80 bg-cyan-500/8 dark:bg-cyan-500/6 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center w-full py-16">
        <div className="space-y-7">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 dark:text-slate-400 text-lg mb-2"
            >
              Hi, I&apos;m
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold leading-tight gradient-text"
            >
              Astha Jain
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 h-9 flex items-center gap-1"
          >
            <span>{typed}</span>
            <span className="motion-safe:animate-pulse text-emerald-500 font-light">|</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-slate-500 dark:text-slate-400 text-base leading-relaxed max-w-md"
          >
            I craft modern, performant web applications with clean code and experiences users love.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 flex-wrap"
          >
            <Button onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}>
              View Projects
            </Button>
            <Button variant="outline" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Contact Me
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-8 pt-2 border-t border-slate-100 dark:border-white/5"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.05 }}
                className="pt-4"
              >
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="hidden md:flex justify-center items-center"
          aria-hidden="true"
        >
          <div className="relative w-80 h-80">
            <div className="absolute inset-0 rounded-full border border-emerald-500/15 dark:border-emerald-500/10" />
            <div className="absolute inset-8 rounded-full border border-emerald-500/20 dark:border-emerald-500/15" />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-dashed border-emerald-500/25 dark:border-emerald-500/20"
            />

            <div className="absolute inset-16 rounded-full bg-emerald-500/8 dark:bg-emerald-500/5 border border-emerald-500/25 dark:border-emerald-500/20 flex items-center justify-center">
              <span className="text-3xl font-bold gradient-text select-none">AJ</span>
            </div>

            {orbitItems.map((item) => {
              const rad = (item.angle * Math.PI) / 180
              const r = 47
              const cx = 50 + r * Math.cos(rad - Math.PI / 2)
              const cy = 50 + r * Math.sin(rad - Math.PI / 2)
              return (
                <motion.div
                  key={item.name}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3 + item.angle / 100, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 glass rounded-xl px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 text-slate-700 dark:text-slate-200"
                  style={{ left: `${cx}%`, top: `${cy}%` }}
                >
                  <span className="text-emerald-500 dark:text-emerald-400">{item.icon}</span>
                  {item.name}
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-400 dark:text-slate-500"
        aria-hidden
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-emerald-500/60 to-transparent" />
      </motion.div>
    </section>
  )
}
