/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        // port: "",
        // pathname: "",
      },
    ],
    domains: [
      "visitapi.pounes.ir",
      "trustseal.enamad.ir",
      "Trustseal.enamad.ir",
      "enamad.ir",
      "*",
    ],
  },
};

module.exports = nextConfig;
