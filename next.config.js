/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  swcMinify: true,
  images: {
    domains: ["covers.openlibrary.org", "avatars.githubusercontent.com"]
  }
}

module.exports = nextConfig
