import { ReactNode, useEffect, useRef } from 'react'

export default function DropdownMenu({
  isOpen,
  setIsOpen,
  children
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  children: ReactNode
}) {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setIsOpen])

  return isOpen ? (
    <div
      ref={dropdownRef}
      className="absolute right-0 z-10 w-fit list-none rounded-md bg-white py-1 shadow-lg ring-1
               ring-black/[.10] backdrop-blur-md dark:bg-[#2a2633]/[.80] dark:ring-white/[.20]"
    >
      {children}
    </div>
  ) : null
}
