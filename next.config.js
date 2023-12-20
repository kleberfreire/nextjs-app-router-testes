/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        // port: '',
        // pathname: '/github.com/**',
      },
    ],
  },
}

module.exports = nextConfig
