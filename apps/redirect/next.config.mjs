/** @type {import('next').NextConfig} */
const config = {
  output: 'standalone',
  reactStrictMode: true,
  transpilePackages: ['@repo/ui'],
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default config
