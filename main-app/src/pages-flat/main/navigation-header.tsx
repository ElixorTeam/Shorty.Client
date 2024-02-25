import Link from 'next/link'

export default function NavigationHeader() {
  return (
    <div className="flex h-14 w-full shrink-0 items-center justify-center border-b text-center">
      <Link href="/">
        <span className="text-3xl font-extrabold">
          Sho<span className="tracking-wide">r</span>
          <span className="tracking-wider">t</span>y
        </span>
      </Link>
    </div>
  )
}
