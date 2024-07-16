/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'static.zara.net' },
      { protocol: 'https', hostname: 'static.zarahome.net' },
    ],
  },
}

export default nextConfig
