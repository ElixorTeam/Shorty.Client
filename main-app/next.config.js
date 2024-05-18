/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    swcPlugins: [
      [
        "@preact-signals/safe-react/swc",
        {
          mode: "auto",
        }
      ],
    ],
  },
}

export default nextConfig
