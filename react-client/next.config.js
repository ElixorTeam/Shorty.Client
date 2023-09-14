const withNextIntl = require('next-intl/plugin')('./i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
  output: process.env.NODE_ENV === 'production' ? 'standalone' : 'undefined',
})

module.exports = nextConfig
