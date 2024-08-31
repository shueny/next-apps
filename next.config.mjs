/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static exports
  reactStrictMode: true,
  basePath: '/next-blog', // Replace with your repository name
  assetPrefix: '/next-blog/', // Replace with your repository name
  images: {
    unoptimized: true,
  },
}

export default nextConfig
