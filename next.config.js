/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['covers.openlibrary.org', "avatars.githubusercontent.com"],
  },
}

module.exports = nextConfig
