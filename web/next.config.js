/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Désactiver la génération statique pour les pages dynamiques
  experimental: {
    isrMemoryCacheSize: 0,
  },
}

module.exports = nextConfig
