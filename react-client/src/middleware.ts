import createIntlMiddleware from 'next-intl/middleware'

export default createIntlMiddleware({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
  domains: [
    {
      domain: 'en.localhost',
      defaultLocale: 'en',
      locales: ['en']
    },
    {
      domain: 'ru.localhost',
      defaultLocale: 'ru',
      locales: ['ru']
    }
  ]
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}
