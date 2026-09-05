/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    const railway = 'https://otrmarket-production.up.railway.app';

    return [
      // Public OTR Market entry point on the main OTR Services domain.
      {
        source: '/gold',
        destination: `${railway}/market/`,
      },
      {
        source: '/gold/:path*',
        destination: `${railway}/market/:path*`,
      },

      // The existing dashboard uses absolute /market asset, API and websocket
      // paths. Proxy that namespace so the app can stay on otrservicesie.com
      // without changing the trading engine or Railway bridge routes.
      {
        source: '/market/:path*',
        destination: `${railway}/market/:path*`,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/gold/:path*',
        headers: [
          { key: 'x-vercel-enable-rewrite-caching', value: '0' },
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
        ],
      },
      {
        source: '/market/:path*',
        headers: [
          { key: 'x-vercel-enable-rewrite-caching', value: '0' },
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
        ],
      },
    ];
  },
};

export default nextConfig;
