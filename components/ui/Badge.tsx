export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-1 text-xs rounded-md bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-medium">
      {children}
    </span>
  )
}
