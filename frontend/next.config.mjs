/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'rainyday-s3-bucket.s3.eu-west-2.amazonaws.com',
      'rainyday-s3-bucket.s3.amazonaws.com',
      's3.amazonaws.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rainyday-s3-bucket.s3.eu-west-2.amazonaws.com',
        port: '',
        pathname: '*',
      },
      {
        protocol: 'https',
        hostname: 'rainyday-s3-bucket.s3.amazonaws.com',
        port: '',
        pathname: '*',
      },
    ],
  },
};

export default nextConfig;
