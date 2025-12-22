await import("./env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  
  // HAPUS bagian 'experimental: { appDir: true }'
  // Ganti dengan konfigurasi gambar Sanity ini:
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default config;