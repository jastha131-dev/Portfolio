'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Download } from 'lucide-react'
import Button from '@/components/ui/Button'
import { urlForImage } from '@/lib/sanity.image'
import type { About as AboutType } from '@/types'

const highlights = [
  { icon: '⚡', label: 'Fast delivery' },
  { icon: '🎯', label: 'Clean code' },
  { icon: '✨', label: 'Great UX' },
]

const codeLines = [
  { indent: 0, text: 'const developer = {', color: 'text-slate-500 dark:text-slate-300' },
  { indent: 1, text: 'name: "Astha Jain",', color: 'text-emerald-600 dark:text-emerald-400' },
  { indent: 1, text: 'role: "Full Stack Dev",', color: 'text-cyan-600 dark:text-cyan-400' },
  { indent: 1, text: 'stack: ["React", "Next.js",', color: 'text-purple-600 dark:text-purple-400' },
  { indent: 2, text: '"Node.js", "MongoDB"],', color: 'text-purple-600 dark:text-purple-400' },
  { indent: 1, text: 'passion: "Clean UX",', color: 'text-amber-600 dark:text-yellow-400' },
  { indent: 1, text: 'experience: "3+ years",', color: 'text-orange-600 dark:text-orange-400' },
  { indent: 0, text: '}', color: 'text-slate-500 dark:text-slate-300' },
]

function DevCard() {
  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/30 to-cyan-500/20 rounded-2xl blur-md" aria-hidden="true" />
      <div className="relative glass rounded-2xl overflow-hidden shadow-2xl">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 dark:bg-slate-900/80 border-b border-slate-200 dark:border-white/8">
          <span className="w-3 h-3 rounded-full bg-red-400" aria-hidden="true" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" aria-hidden="true" />
          <span className="w-3 h-3 rounded-full bg-emerald-500" aria-hidden="true" />
          <span className="ml-2 text-xs text-slate-400 dark:text-slate-500 font-mono">profile.js</span>
        </div>

        {/* Code content */}
        <div className="p-5 font-mono text-sm space-y-1 bg-slate-50 dark:bg-slate-900/60">
          {codeLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className={`${line.color} leading-relaxed`}
              style={{ paddingLeft: `${line.indent * 16}px` }}
            >
              {line.text}
            </motion.div>
          ))}
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-emerald-400 font-bold"
          >
            ▋
          </motion.div>
        </div>

        {/* Profile footer */}
        <div className="px-5 py-4 bg-slate-100 dark:bg-slate-900/80 border-t border-slate-200 dark:border-white/8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            AJ
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">Astha Jain</div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400">Full Stack Developer</div>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span className="text-xs text-slate-400 dark:text-slate-400">Active</span>
          </div>
        </div>
      </div>

      {/* Floating stat card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="absolute -bottom-5 -right-5 glass rounded-2xl px-4 py-3 shadow-xl"
      >
        <div className="text-2xl font-bold gradient-text">3+</div>
        <div className="text-xs text-slate-400">Years Experience</div>
      </motion.div>
    </div>
  )
}

export default function About({ data }: { data: AboutType | null }) {
  const hasImage = !!data?.profileImage

  return (
    <section id="about" className="py-28 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="section-label mb-3">Who I Am</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: image or dev card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {hasImage ? (
              <div className="relative aspect-square max-w-sm mx-auto w-full">
                <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/30 to-cyan-500/20 rounded-2xl blur-sm" aria-hidden="true" />
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src={urlForImage(data!.profileImage).width(600).height(600).url()}
                    alt={data!.profileImage.alt ?? 'Astha Jain'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 80vw, 400px"
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="absolute -bottom-4 -right-4 glass rounded-2xl px-4 py-3 shadow-xl"
                >
                  <div className="text-2xl font-bold gradient-text">3+</div>
                  <div className="text-xs text-slate-400">Years Experience</div>
                </motion.div>
              </div>
            ) : (
              <DevCard />
            )}
          </motion.div>

          {/* Right: bio */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-slate-300 leading-relaxed text-lg">
              {data?.bio ??
                "I'm Astha Jain, a Full Stack Web Developer & UI Designer passionate about building modern, performant web applications with clean code and exceptional user experiences."}
            </p>

            <p className="text-slate-400 leading-relaxed">
              I specialize in full-stack development using React, Next.js, and Node.js — turning ideas into polished digital products that people love to use.
            </p>

            <div className="flex gap-3 flex-wrap pt-2">
              {highlights.map((h) => (
                <div key={h.label} className="flex items-center gap-2 glass rounded-xl px-4 py-2.5">
                  <span aria-hidden="true">{h.icon}</span>
                  <span className="text-sm font-medium text-slate-300">{h.label}</span>
                </div>
              ))}
            </div>

            {data?.cvUrl && (
              <a href={data.cvUrl} target="_blank" rel="noopener noreferrer">
                <Button className="mt-2">
                  <Download size={16} aria-hidden="true" />
                  Download CV
                </Button>
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
