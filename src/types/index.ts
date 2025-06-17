export interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  category?: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  tax: number;
  grandTotal: number;
}