/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['covers.openlibrary.org'],
  },
}

module.exports = nextConfig
