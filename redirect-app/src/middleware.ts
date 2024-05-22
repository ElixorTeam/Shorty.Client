import { NextURL } from 'next/dist/server/web/next-url'
import { notFound } from 'next/navigation'
import { NextRequest, NextResponse, userAgent } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

type UserAgent = {
  device: string | undefined
  os: string | undefined
  browser: string | undefined
}

type SplittedUrl = {
  domain: string
  subdomain: string | undefined
  path: string
}

const splitUrl = (url: NextURL): SplittedUrl => {
  const domain = url.hostname
  const subdomain = domain.split('.').slice(0, -2).join('.') ?? undefined
  const path = url.pathname
  return { domain, subdomain, path }
}

const sendAnalytics = async (
  agent: UserAgent,
  userKey: string,
  urlParts: SplittedUrl
) => {
  const body = JSON.stringify({ ...agent, ...urlParts, userKey })
  fetch(`${process.env.BACKEND_URL}/analytics`, {body, method: "POST"})
}

export default async function middleware(request: NextRequest) {
  const urlParts = splitUrl(request.nextUrl)
  const response = NextResponse.next()
  const userKey = request.cookies.get('userKey')?.value ?? uuidv4()
  response.cookies.set('userKey', userKey)

  const { device, os, browser, isBot } = userAgent(request)
  if (isBot) notFound()
  await sendAnalytics(
    { device: device.model, os: os.name, browser: browser.name },
    userKey,
    urlParts
  )
  return response
}

export const config = {
  matcher: ['/:path'],
}
