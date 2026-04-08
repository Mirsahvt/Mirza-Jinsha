/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  allowedDevOrigins: ["localhost", "169.254.88.10"],
  images: {
    unoptimized: true,
  },
}

export default nextConfig