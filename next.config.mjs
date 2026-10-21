/** @type {import('next').NextConfig} */
const nextConfig = {
  // Endereço oficial: www.nivaldonascimento.adv.br. O domínio sem www e o
  // endereço antigo da Vercel redirecionam para ele (308, permanente).
  async redirects() {
    return ["nivaldonascimento.adv.br", "nivaldoadv.vercel.app"].map(
      (host) => ({
        source: "/:path*",
        has: [{ type: "host", value: host }],
        destination: "https://www.nivaldonascimento.adv.br/:path*",
        permanent: true,
      })
    );
  },
};

export default nextConfig;
