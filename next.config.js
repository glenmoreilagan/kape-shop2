/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  // assetPrefix: isProd ? 'https://kape-shop.vercel.app/' : 'http://localhost:3000/',
  reactStrictMode: false,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  output: 'export',
  env: {
    google_client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  },
}

module.exports = nextConfig
