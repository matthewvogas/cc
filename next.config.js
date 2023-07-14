/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'scontent.cdninstagram.com',
      'avatars.githubusercontent.com',
      'platform-lookaside.fbsbx.com',
    ],
  },
}

module.exports = nextConfig
