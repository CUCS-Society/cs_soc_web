/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
    images: {
        remotePatterns: [
        {
            protocol: process.env.NEXT_PUBLIC_PROTOCOL,
            hostname: process.env.NEXT_PUBLIC_HOSTNAME,
            port: process.env.NEXT_PUBLIC_PORT,
            pathname: `${process.env.NEXT_PUBLIC_STATIC_RESOURCES_PATHNAME}/**`,
        },
        ],
        dangerouslyAllowLocalIP: true,
  },
}

export default nextConfig
