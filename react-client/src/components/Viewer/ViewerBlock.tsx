import { ReactNode } from 'react'

export default function ViewerBlock({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full items-center justify-center rounded-2xl bg-white shadow-2xl dark:bg-[#23212e] md:block md:w-fit">
      {children}
    </div>
  )
}
