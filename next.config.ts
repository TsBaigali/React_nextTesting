/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['golomtcapital.com'], // ✅ Allow external images from this domain
  },
};

module.exports = nextConfig;
