import createIntlMiddleware from 'next-intl/middleware'

export default createIntlMiddleware({
  locales: ['en', 'ru'],
  defaultLocale: 'en',

  routing: {
    type: 'domain',
    domains: [
      {
        domain: 'en.localhost',
        locale: 'en'
      },
      {
        domain: 'ru.localhost',
        locale: 'ru'
      }
    ]
  }
})

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|assets).*)']
}
