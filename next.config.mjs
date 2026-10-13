/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: { outputFileTracingIncludes: { "/api/og": ["./app/api/og/fonts/**"] } },
};
export default nextConfig;
