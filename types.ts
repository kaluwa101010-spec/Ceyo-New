export interface Product {
  id: string;
  name: string;
  category: 'tees' | 'shirts' | 'polos' | 'bottoms' | 'accessories';
  priceLKR: number;
  originalPriceLKR?: number;
  image: string;
  gallery?: string[];
  description: string;
  fabric: string;
  fit: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  inStock: boolean;
  featured?: boolean;
  tag?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  priceLKR: number;
  image: string;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface CustomerOrderDetails {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  city: string;
  notes?: string;
}
