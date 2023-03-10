/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "upload.wikimedia.org",
      "i.imgur.com",
      "cdn.sanity.io",
      "rb.gy",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
