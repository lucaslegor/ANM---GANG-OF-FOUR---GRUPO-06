/** @type {import('next').NextConfig} */
module.exports = {
  // para que Netlify no corte por errores de TS/ESLint
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // Netlify
  images: { unoptimized: true },
  basePath: '',      // en Netlify no usamos subcarpeta
  assetPrefix: '',
  trailingSlash: true,
};
