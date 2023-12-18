import createIntlMiddleware from 'next-intl/middleware'

import { localePrefix, locales } from '@/utils/navigation'

export default createIntlMiddleware({
  defaultLocale: 'en',
  localePrefix,
  locales,
})

export const config = {
  matcher: ['/', '/((?!api|_next|_vercel|.*\\..*).*)'],
}
