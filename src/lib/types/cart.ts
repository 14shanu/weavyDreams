export interface CartItem {
  id: string;
  type: 'package' | 'service';
  name: string;
  price: number;
  quantity: number;
  customizations?: Record<string, any>;
}

export interface Cart {
  items: CartItem[];
  total: number;
  currency: string;
}
