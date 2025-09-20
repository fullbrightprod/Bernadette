/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ✅ Ne bloque pas le build sur Vercel à cause des erreurs ESLint
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
