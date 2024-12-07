/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  basePath: '/next-apps', 
  assetPrefix: '/next-apps/',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
