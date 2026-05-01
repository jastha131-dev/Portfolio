'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Download } from 'lucide-react'
import Button from '@/components/ui/Button'
import { urlForImage } from '@/lib/sanity.image'
import type { About as AboutType } from '@/types'

export default function About({ data }: { data: AboutType | null }) {
  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12"
        >
          About <span className="text-emerald-500">Me</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square max-w-sm mx-auto w-full"
          >
            {data?.profileImage ? (
              <Image
                src={urlForImage(data.profileImage).width(600).height(600).url()}
                alt={data.profileImage.alt ?? 'Astha Jain'}
                fill
                className="object-cover rounded-2xl"
                sizes="(max-width: 768px) 80vw, 400px"
              />
            ) : (
              <div className="w-full h-full rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <span className="text-6xl font-bold text-emerald-500/40 select-none">
                  AJ
                </span>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <MapPin size={16} className="text-emerald-500" aria-hidden="true" />
              <span>{data?.location ?? 'Dubai'}</span>
            </div>

            <p className="text-slate-300 leading-relaxed text-lg">
              {data?.bio ??
                'Web Developer & Designer based in Dubai, passionate about building modern, performant web applications with great user experiences.'}
            </p>

            {data?.cvUrl && (
              <a href={data.cvUrl} target="_blank" rel="noopener noreferrer">
                <Button className="inline-flex items-center gap-2">
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
