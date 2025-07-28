import { z } from 'zod'

const createUrl = (
  domain: string,
  subdomain: string | undefined,
  path: string | undefined
) => {
  const protocol = domain.includes('localhost') ? 'http:' : 'https:'
  const host = subdomain ? `${subdomain}.${domain}` : domain
  let normalizedPath = ''
  if (path) normalizedPath = path.startsWith('/') ? path : `/${path}`
  const url = `${protocol}//${host}${normalizedPath}`
  return z.string().url().safeParse(url).success ? new URL(url) : undefined
}

const generateRandomPath = (length: number = 6): string => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz'
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => chars[byte % chars.length]).join('')
}

export { createUrl, generateRandomPath }
