import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import AttorneySchema from "@/components/seo/AttorneySchema";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["600", "700"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const defaultDescription =
  "Advocacia com atuação dedicada a Inventários e Sucessões, Direito de Família e Legalização de Imóveis em Rio de Janeiro/RJ.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.lawyerName} | Advocacia`,
    template: `%s | ${siteConfig.lawyerName}`,
  },
  description: defaultDescription,
  keywords: [
    "advogado inventário Rio de Janeiro",
    "inventário extrajudicial",
    "direito de família",
    "legalização de imóveis",
    "advogado sucessões RJ",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: `${siteConfig.lawyerName} | Advocacia`,
    title: `${siteConfig.lawyerName} | Advocacia`,
    description: defaultDescription,
    images: [
      {
        url: "/images/logo.jpg",
        width: 1366,
        height: 1366,
        alt: siteConfig.lawyerName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.lawyerName} | Advocacia`,
    description: defaultDescription,
    images: ["/images/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans bg-brand-cream text-brand-navy`}
      >
        <AttorneySchema />
        <Header />
        {children}
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
