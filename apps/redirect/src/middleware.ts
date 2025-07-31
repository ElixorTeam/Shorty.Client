import { v4 as uuidv4 } from 'uuid'
import { type NextURL } from 'next/dist/server/web/next-url'
import { NextRequest, NextResponse, userAgent } from 'next/server'
import { config as globalConfig } from '@/shared/config'
import z from 'zod'

type SplittedUrl = {
  domain: string
  subdomain: string | undefined
  path: string
}

const isUrl = (value: string): boolean =>
  z.string().url().safeParse(value).success

const splitUrl = (url: NextURL): SplittedUrl => {
  const domain = new URL(globalConfig.REDIRECT_DOMAIN).host
  const path = url.pathname.slice(1)
  const subdomain = undefined
  return { domain, subdomain, path }
}

const getIp = (headers: Headers): string => {
  const forwardedForIp = headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  if (forwardedForIp && isUrl(forwardedForIp)) return forwardedForIp

  const realIp = headers.get('x-real-ip')?.trim()
  return realIp && isUrl(realIp) ? realIp : '0.0.0.0'
}

export default async function middleware(request: NextRequest) {
  console.log('middleware')
  const { device, os, isBot } = userAgent(request)
  if (isBot) return NextResponse.error()

  const deviceType = device.type === 'mobile' ? 'Mobile' : 'Desktop'
  const userKey = request.cookies.get('userKey')?.value ?? uuidv4()
  const urlParts = splitUrl(request.nextUrl)
  const ip = getIp(request.headers)

  const response = NextResponse.next()
  response.cookies.set('userKey', userKey)

  const body = JSON.stringify({
    device: deviceType,
    os: os.name ?? 'Unknown',
    ip,
    userKey,
    ...urlParts,
  })

  console.log(body)
  try {
    await fetch(`${process.env.API_BASE_URL ?? ''}/redirects`, {
      body,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
  } catch {
    // pass
  }

  console.log('end middleware')

  return response
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|__nextjs)[^/]*)',
}
