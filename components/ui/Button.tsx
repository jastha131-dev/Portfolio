import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'
}

export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer active:scale-95'
  const variants = {
    primary:
      'bg-emerald-500 text-white hover:bg-emerald-400 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5',
    outline:
      'border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400 hover:-translate-y-0.5',
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
