'use client'

import { motion, stagger, useAnimate } from 'framer-motion'
import { useEffect } from 'react'

import cn from '@/shared/lib/tailwind-merge'

export default function TextGenerator({
  words,
  className,
}: {
  words: string
  className?: string
}) {
  const [scope, animate] = useAnimate()
  const wordsArray = words.split(' ')
  useEffect(() => {
    animate(
      'span',
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(0.2),
      }
    )
  }, [animate])

  return (
    <motion.div ref={scope}>
      {wordsArray.map((word, idx) => (
        // TODO: fix eslint
        // eslint-disable-next-line react/no-array-index-key
        <motion.span key={word + idx} className={cn('opacity-0', className)}>
          {word}{' '}
        </motion.span>
      ))}
    </motion.div>
  )
}
