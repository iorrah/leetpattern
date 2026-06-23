import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Force Turbopack to preserve native Node/WASM execution contexts
  serverExternalPackages: ['@prisma/client', '@libsql/client', '@prisma/adapter-libsql'],
};

export default nextConfig;
