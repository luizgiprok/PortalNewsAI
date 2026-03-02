/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['example.com', 'placeholder.com'],
  },
  trailingSlash: true,
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
}

module.exports = nextConfig