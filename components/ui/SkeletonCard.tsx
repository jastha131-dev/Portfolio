export default function SkeletonCard() {
  return (
    <div className="rounded-xl border border-white/10 overflow-hidden animate-pulse">
      <div className="h-48 bg-slate-700/50" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-slate-700/50 rounded w-3/4" />
        <div className="h-4 bg-slate-700/50 rounded w-full" />
        <div className="h-4 bg-slate-700/50 rounded w-5/6" />
        <div className="flex gap-2 mt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 w-16 bg-slate-700/50 rounded" />
          ))}
        </div>
      </div>
    </div>
  )
}
