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
    'px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 cursor-pointer'
  const variants = {
    primary:
      'bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/25',
    outline:
      'border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white',
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
