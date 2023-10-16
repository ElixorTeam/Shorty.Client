import { ReactNode } from 'react'

export default function FeatureCard({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <div className="flex h-[24rem] w-[24rem] flex-col overflow-hidden rounded-2xl border bg-gradient-to-br from-white to-gray-100 shadow-sm transition hover:border-black/[.3] hover:shadow dark:border-white/[.15] dark:from-neutral-900 dark:to-black dark:hover:border-white/[.3]">
      <div className="relative h-full w-full overflow-hidden">{children}</div>
      <div className="h-32 px-6 py-1">
        <p className="mb-1 text-xl font-semibold leading-tight tracking-tight text-neutral-800 dark:text-neutral-200">
          {title}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      </div>
    </div>
  )
}
