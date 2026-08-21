import { siteConfig } from "@/lib/site-config";

export default function WhatsAppButton() {
  const message = encodeURIComponent(
    "Olá, gostaria de falar sobre um caso jurídico."
  );
  const href = `https://wa.me/${siteConfig.whatsappNumber}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 transition-transform"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor" aria-hidden="true">
        <path d="M16 3C9.4 3 4 8.4 4 15c0 2.2.6 4.3 1.7 6.1L4 29l8.1-1.7A12.9 12.9 0 0 0 16 27c6.6 0 12-5.4 12-12S22.6 3 16 3zm0 22c-1.9 0-3.7-.5-5.3-1.4l-.4-.2-4.8 1 1-4.7-.2-.4A9.9 9.9 0 1 1 16 25z" />
      </svg>
    </a>
  );
}
