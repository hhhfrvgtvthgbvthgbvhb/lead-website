const { withPayload } = require('@payloadcms/next/withPayload')
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
      },
    ],
  },
  serverExternalPackages: ['pino', 'pino-abstract-transport', 'thread-stream'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // The cloud-storage utilities barrel pulls server-only code (pino, node
      // builtins) into the browser bundle via the blob client upload handler —
      // replace it with the client-safe shim.
      const shim = path.resolve(__dirname, 'scripts/cloud-storage-utilities-shim.js')
      config.resolve.alias = {
        ...config.resolve.alias,
        '@payloadcms/plugin-cloud-storage/utilities': shim,
        '@payloadcms/plugin-cloud-storage/dist/exports/utilities.js': shim,
      }
    }
    return config
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = withPayload(nextConfig)
