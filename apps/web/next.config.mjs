/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ['@repo/ui'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    swcPlugins: [
      [
        '@preact-signals/safe-react/swc',
        {
          mode: 'auto',
        },
      ],
    ],
  },
}

export default config