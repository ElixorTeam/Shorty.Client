import { SVGAttributes } from 'react'

export default function CursorIcon({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      viewBox="0 0 512 512"
      {...props}
    >
      <path d="m82 236 1 235 99-94 6-6 30 70 31 71 97-42a3809 3809 0 0 0-61-140l70-6 72-5A35304 35304 0 0 0 83 1l-1 235zm153-55 122 113a2588 2588 0 0 1-117 8 3896 3896 0 0 0 66 152c0 1-40 18-41 17a4394 4394 0 0 1-67-150 3396 3396 0 0 1-86 80 18162 18162 0 0 1 1-332l122 112z" />
    </svg>
  )
}