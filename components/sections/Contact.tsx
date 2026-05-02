'use client'

import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import type { About } from '@/types'

function buildSocials(data: About | null) {
  const email = data?.email ?? 'jastha131@gmail.com'
  const whatsapp = data?.whatsappNumber
  const github = data?.githubUrl ?? 'https://github.com/jastha131-dev'
  const linkedin = data?.linkedinUrl

  const items = [
    {
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
      icon: <Mail size={20} aria-hidden="true" />,
    },
    ...(whatsapp
      ? [{
          label: 'WhatsApp',
          value: 'Chat on WhatsApp',
          href: `https://wa.me/${whatsapp}?text=Hi%20Astha!%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect.`,
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          ),
        }]
      : []),
    {
      label: 'GitHub',
      value: github.replace('https://', ''),
      href: github,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    ...(linkedin
      ? [{
          label: 'LinkedIn',
          value: 'LinkedIn Profile',
          href: linkedin,
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          ),
        }]
      : []),
  ]

  return { email, items }
}

const inputClass =
  'w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-slate-800/40 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500/60 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm'

export default function Contact({ data }: { data: About | null }) {
  const { email, items } = buildSocials(data)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`)
    const body = encodeURIComponent(`From: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="section-label mb-3">Let&apos;s Work Together</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Get In <span className="gradient-text">Touch</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <p className="text-slate-400 leading-relaxed text-lg">
              Open to new opportunities and collaborations. Have a project in mind? Let&apos;s build something great together.
            </p>

            <div className="space-y-3 pt-2">
              {items.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-4 glass rounded-xl group border border-slate-200 dark:border-white/6 hover:border-emerald-500/40 transition-colors"
                >
                  <div className="text-emerald-500 group-hover:scale-110 transition-transform flex-shrink-0">
                    {s.icon}
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 mb-0.5">{s.label}</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-emerald-500 transition-colors">{s.value}</div>
                  </div>
                  <div className="ml-auto text-slate-400 dark:text-slate-600 group-hover:text-emerald-500 transition-colors">→</div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-8 space-y-5"
          >
            <input
              type="text"
              placeholder="Your Name"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={inputClass}
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className={inputClass}
            />
            <textarea
              placeholder="Your Message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className={`${inputClass} resize-none`}
            />
            <Button type="submit" className="w-full justify-center text-base py-4">
              {sent ? '✓ Message Sent!' : 'Send Message'}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
