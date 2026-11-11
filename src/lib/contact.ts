/** Primary trade desk WhatsApp number (Dixit Soni), international format without "+" */
export const WHATSAPP_NUMBER = "919825953334";

/** Build a wa.me link with a pre-filled message */
export const buildWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
