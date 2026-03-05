export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  old_price: number | null;
  image: string;
  category_id: number;
  category_name?: string;
  material: string;
  color: string;
  stock: number;
  is_featured: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
