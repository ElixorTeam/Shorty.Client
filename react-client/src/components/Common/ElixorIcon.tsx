import { SVGAttributes } from 'react'

export default function ElixorIcon({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      viewBox="0 0 2048 2048"
      {...props}
    >
      <path d="M1029.5 128.5c1.18-.219 2.18.114 3 1l1002 1737c-669 1.33-1338 1.33-2007 0 47.8737-83.25 95.874-166.42 144-249.5 478.667-.33 957.33-.67 1436-1-192.29-332.75-384.46-665.585-576.5-998.5-143.581 249.497-287.414 498.83-431.5 748-94.333 1.33-188.667 1.33-283 0 237.943-412.225 475.61-824.558 713-1237Z" />
    </svg>
  )
}
