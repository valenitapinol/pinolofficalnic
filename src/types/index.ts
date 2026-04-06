export interface Restaurant {
  id: number;
  name: string;
  rating: number;
  time: number;
  price: number;
  image?: string;
}

export interface MenuItem {
  id: number;
  restaurantId: number;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'preparing' | 'delivering' | 'delivered';
  created_at?: string;    // para pedidos de Supabase
  user_id?: string;
  restaurant_id?: number;
}
