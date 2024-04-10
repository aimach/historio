/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gallica.bnf.fr",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
