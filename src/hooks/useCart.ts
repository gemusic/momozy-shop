import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/lib/index';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, size: string) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  checkoutWhatsApp: () => void;
}

const WHATSAPP_NUMBER = '+22996092439';

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [] as CartItem[],

      addItem: (product, size) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id && item.selectedSize === size
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id && item.selectedSize === size
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { ...product, quantity: 1, selectedSize: size }],
          };
        });
      },

      removeItem: (productId, size) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.id === productId && item.selectedSize === size)
          ),
        }));
      },

      updateQuantity: (productId, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId && item.selectedSize === size
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      checkoutWhatsApp: () => {
        const items = get().items;
        if (items.length === 0) return;

        const totalPrice = get().getTotalPrice();
        const formattedPrice = new Intl.NumberFormat('fr-FR').format(totalPrice) + ' CFA';

        let message = "Salut MOMOZY SHOP ! 👋\n\nJe souhaite passer une commande :\n";
        
        items.forEach((item) => {
          message += `\n- ${item.name}\n  Taille: ${item.selectedSize}\n  Quantité: ${item.quantity}\n  Prix: ${new Intl.NumberFormat('fr-FR').format(item.price)} CFA\n`;
        });

        message += `\n━━━━━━━━━━━━━━━\n💰 *TOTAL : ${formattedPrice}*\n━━━━━━━━━━━━━━━\n\nMerci de me confirmer la disponibilité pour finaliser l'achat.`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
      },
    }),
    {
      name: 'momozy-cart-storage',
    }
  )
);
