import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <div className="my-32 flex flex-col items-center justify-center gap-6 px-6 text-center md:my-64">
      <p className="bg-gradient-to-b from-gray-500 to-gray-900 bg-clip-text pb-2 text-3xl font-semibold text-transparent dark:from-neutral-100 dark:to-neutral-500 md:text-5xl">
        Shorten, Manage, Analyze. Your key to efficient links.
      </p>
      <p className="max-w-screen-md font-light text-gray-600 dark:text-neutral-400 md:text-xl">
        Unlock the power of efficient linking. Our service offers a simple,
        user-friendly platform for shortening, managing, and analyzing your
        links.
      </p>
      <Button size="lg" type="button" asChild>
        <Link href="/main">Get Started</Link>
      </Button>
    </div>
  )
}
