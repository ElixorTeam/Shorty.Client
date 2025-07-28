'use client'

import { cn } from '@repo/ui/lib/utils'
import { motion, stagger, useAnimate } from 'framer-motion'
import { useEffect } from 'react'

export function TextGenerator({
  words,
  className,
  filter = true,
  duration = 0.5,
}: Readonly<{
  words: string
  className?: string
  filter?: boolean
  duration?: number
}>) {
  const [scope, animate] = useAnimate()
  const wordsArray = words.split(' ')
  useEffect(() => {
    animate(
      'span',
      {
        opacity: 1,
        filter: filter ? 'blur(0px)' : 'none',
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.2),
      }
    )
  }, [scope.current])

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={`${word}-${idx}`}
              className="text-black opacity-0 dark:text-white"
              style={{
                filter: filter ? 'blur(10px)' : 'none',
              }}
            >
              {word}{' '}
            </motion.span>
          )
        })}
      </motion.div>
    )
  }

  return (
    <div
      className={cn(
        'text-2xl leading-snug font-bold tracking-wide text-black dark:text-white',
        className
      )}
    >
      {renderWords()}
    </div>
  )
}
