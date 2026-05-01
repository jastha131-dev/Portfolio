'use client'

import { motion } from 'framer-motion'
import { useTypewriter } from '@/hooks/useTypewriter'
import Button from '@/components/ui/Button'

const titles = ['Web Developer', 'UI Designer', 'Full Stack Developer']

export default function Hero() {
  const typed = useTypewriter(titles)

  return (
    <section className="relative min-h-screen flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
        <div className="space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-emerald-500 font-medium tracking-wide"
          >
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold leading-tight"
          >
            Astha Jain
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl text-slate-400 h-9 flex items-center gap-1"
          >
            <span>{typed}</span>
            <span className="animate-pulse text-emerald-500 font-light">|</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 flex-wrap"
          >
            <Button
              onClick={() =>
                document
                  .querySelector('#projects')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              View Projects
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                document
                  .querySelector('#contact')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Contact Me
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
          className="hidden md:flex justify-center"
        >
          <div className="relative w-72 h-72">
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />
            <div className="relative w-full h-full rounded-full border-2 border-emerald-500/30 flex items-center justify-center bg-slate-800/30">
              <span className="text-8xl font-bold text-emerald-500/30 select-none">
                AJ
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 text-2xl"
        aria-hidden
      >
        ↓
      </motion.div>
    </section>
  )
}
