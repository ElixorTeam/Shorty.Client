import {
  ButtonHTMLAttributes,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  SVGProps,
  RefAttributes,
} from 'react'

import cn from '@/utils/classNames'

type IconButtonType = {
  Icon: ForwardRefExoticComponent<
    PropsWithoutRef<SVGProps<SVGSVGElement>> & {
      title?: string
      titleId?: string
    } & RefAttributes<SVGSVGElement>
  >
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function IconButton({
  Icon,
  type = 'button',
  className,
  ...props
}: IconButtonType) {
  return (
    <button
      className={cn(
        'text-gray-600 hover:text-gray-800 active:text-black dark:text-neutral-400 dark:hover:text-neutral-200 dark:active:text-white',
        className
      )}
      // eslint-disable-next-line react/button-has-type
      type={type}
      {...props}
    >
      <Icon className="h-4 w-4" />
    </button>
  )
}
