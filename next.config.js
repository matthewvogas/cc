/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'devcodecoco.s3.us-east-1.amazonaws.com',
      'scontent.cdninstagram.com',
      'avatars.githubusercontent.com',
      'platform-lookaside.fbsbx.com',
      'fbcdn.net',
      'scontent.fmga3-2.fna.fbcdn.net',
      'scontent.fmga3-1.fna.fbcdn.net',
    ],
  },
}

module.exports = nextConfig
