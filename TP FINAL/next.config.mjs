/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
          // Remover o comentar estos headers si causan problemas con AR.js desde CDN
          // {
          //   key: 'Cross-Origin-Embedder-Policy',
          //   value: 'require-corp',
          // },
          // {
          //   key: 'Cross-Origin-Opener-Policy',
          //   value: 'same-origin',
          // },
        ],
      },
    ]
  },
}

export default nextConfig
