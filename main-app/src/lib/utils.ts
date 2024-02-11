import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandomString(length: number = 6): string {
  const characters: string = '0123456789abcdefghijklmnopqrstuvwxyz'
  let result: string = ''

  for (let i: number = 0; i < length; i += 1) {
    const randomIndex: number = Math.floor(Math.random() * characters.length)
    result += characters[randomIndex]
  }

  return result
}

export function generateUrl(
  prefix: string | null | undefined,
  domain: string,
  path: string | null | undefined
): string {
  return (prefix ? `${prefix}.` : '') + domain + (path ? `/${path}` : '')
}
