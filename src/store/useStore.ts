import { create } from 'zustand';
import type { CartItem, Order } from '../types';

interface Store {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;

  user: { id: number; name: string; email: string } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;

  orders: Order[];
  addOrder: (order: Order) => void;
}

export const useStore = create<Store>((set, get) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find((i) => i.id === item.id);
      if (existing) {
        return {
          cart: state.cart.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { cart: [...state.cart, { ...item, quantity: 1 }] };
    }),
  removeFromCart: (id) =>
    set((state) => ({ cart: state.cart.filter((i) => i.id !== id) })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((i) => (i.id === id ? { ...i, quantity } : i)),
    })),
  clearCart: () => set({ cart: [] }),
  getTotal: () => get().cart.reduce((sum, i) => sum + i.price * i.quantity, 0),

  user: null,
  login: (email, password) => {
    if (email && password) {
      set({ user: { id: 1, name: 'Carlos', email } });
      return true;
    }
    return false;
  },
  logout: () => set({ user: null, cart: [] }),

  orders: [],
  addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
}));
