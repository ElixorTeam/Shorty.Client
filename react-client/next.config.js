const withNextIntl = require('next-intl/plugin')('./i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
  reactStrictMode: true,
  experimental: {
    appDir: true
  }
})

module.exports = {
    webpack(config) {
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.('.svg'),
        )

        config.module.rules.push(
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                resourceQuery: {not: /url/}, // exclude if *.svg?url
                use: ['@svgr/webpack'],
            },
        )
        fileLoaderRule.exclude = /\.svg$/i

        return config
    }
}

module.exports = nextConfig
