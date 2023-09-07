import { ReactNode, useEffect, useRef } from 'react'

export default function DropdownMenu({
  isOpen,
  setIsOpen,
  children,
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
      )
        setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setIsOpen])

  return isOpen ? (
    <div
      ref={dropdownRef}
      className="absolute right-0 z-10 list-none rounded-md border border-neutral-300 bg-white/[.8] py-1 shadow-lg
       backdrop-blur-md dark:border-neutral-700 dark:bg-[#2a2633]/[.8]"
    >
      {children}
    </div>
  ) : null
}
