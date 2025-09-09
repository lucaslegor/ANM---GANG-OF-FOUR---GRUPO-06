/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}
const isNetlify = !!process.env.NETLIFY  // Netlify setea esta env var
/** @type {import('next').NextConfig} */
module.exports = {
  images: { unoptimized: true },
  // En Netlify NO uses basePath/assetPrefix, dejalos vacíos:
  basePath: '',
  assetPrefix: '',
  trailingSlash: true,
}

export default nextConfig
