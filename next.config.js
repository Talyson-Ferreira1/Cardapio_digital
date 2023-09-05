/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'firebasestorage.googleapis.com', // Adicione o domínio da imagem aqui
    ],
  },
};

module.exports = nextConfig;
