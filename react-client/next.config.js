const withNextIntl = require('next-intl/plugin')('./src/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  output: 'standalone'
})

module.exports = nextConfig
