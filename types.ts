
export type Category = 'Адабиёт' | 'Таърих' | 'Илм' | 'Бачагона' | 'Психология';

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  category: Category;
  description: string;
  coverImage: string;
  stock: number;
}

export interface CartItem extends Book {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'Нав' | 'Дар раванд' | 'Иҷрошуда';
}

export type Page = 'home' | 'catalog' | 'about' | 'cart' | 'admin' | 'checkout' | 'success';
