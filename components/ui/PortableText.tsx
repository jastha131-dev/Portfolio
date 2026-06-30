import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

const components = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mt-6 mb-3">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-slate-500 dark:text-slate-400 my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-inside space-y-1 mb-4 text-slate-600 dark:text-slate-300">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside space-y-1 mb-4 text-slate-600 dark:text-slate-300">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-slate-900 dark:text-white">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => <em>{children}</em>,
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm font-mono text-emerald-600 dark:text-emerald-400">
        {children}
      </code>
    ),
    link: ({ value, children }: { value?: { href?: string }; children?: React.ReactNode }) => {
      const href = /^https?:\/\//i.test(value?.href ?? '') ? value!.href! : '#'
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-500 hover:underline"
        >
          {children}
        </a>
      )
    },
  },
}

export default function PortableTextRenderer({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />
}
