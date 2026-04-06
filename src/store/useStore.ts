import { create } from 'zustand';
import type { CartItem, Order } from '../types';
import { supabase } from '../lib/supabase';

interface Store {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;

  user: any | null;
  loadingUser: boolean;
  setUser: (user: any) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;

  orders: Order[];
  addOrder: (order: Order) => void;
  fetchOrders: () => Promise<void>;
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
  loadingUser: true,
  setUser: (user) => set({ user, loadingUser: false }),

  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error(error);
      return false;
    }
    set({ user: data.user });
    return true;
  },

  register: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error(error);
      return false;
    }
    set({ user: data.user });
    return true;
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, cart: [] });
  },

  orders: [],
  addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
  fetchOrders: async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*, products(*))')
      .order('created_at', { ascending: false });
    if (error) console.error(error);
    else set({ orders: data || [] });
  },
}));

// Escuchar cambios en la sesión de Supabase
supabase.auth.onAuthStateChange((_event, session) => {
  useStore.getState().setUser(session?.user || null);
});
