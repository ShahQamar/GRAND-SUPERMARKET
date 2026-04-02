import { MessageCircle } from 'lucide-react';

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/918006271000?text=Hi%20Grand%20Supermarket!%20I%27d%20like%20to%20place%20an%20order%20%F0%9F%9B%92"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-[9999] w-[60px] h-[60px] bg-brand-whatsapp text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors animate-pulse-ring group"
      title="Order on WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
      <span className="absolute right-full mr-4 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Order on WhatsApp
      </span>
    </a>
  );
}
