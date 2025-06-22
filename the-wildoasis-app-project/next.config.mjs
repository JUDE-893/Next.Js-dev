/** @type {import('next').NextConfig} */

const cabinImagesCredits = process.env.SUPABASE_URL.split('://');
const nextConfig = {
  images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'dclaevazetcjjkrzczpc.supabase.co',
          pathname: '/storage/v1/object/public/cabin-images/**',
        },
        {
          protocol: cabinImagesCredits[0],
          hostname: cabinImagesCredits[1],
          pathname: '/storage/v1/object/public/cabin-images/**',
        },
      ],
    },};

export default nextConfig;
