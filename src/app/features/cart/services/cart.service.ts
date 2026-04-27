import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../../products/models/product.model';
import{CartItem} from '../models/cart.model';

@Injectable({ providedIn: 'root' })

export class CartService {

  private items = signal<CartItem[]>(this.loadFromStorage());

  cartItems = computed(() => this.items());

total = computed(() =>
  this.items()
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2)
);

  count = computed(() =>
    this.items().reduce((sum, item) =>
      sum + item.quantity, 0)
  );

  private loadFromStorage(): CartItem[] {
    try {
      if (typeof window === 'undefined') return [];

      const data = localStorage.getItem('cart');
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error('Cart load error:', err);
      return [];
    }
  }

  private saveToStorage(items: CartItem[]) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(items));}
  }

  add(product: Product) {
    this.items.update(list => {
      const existing = list.find(p => p.id === product.id);
      const newList = existing
        ? list.map(p =>
            p.id === product.id
              ? { ...p, quantity: p.quantity + 1 }
              : p
          )
        : [...list, { ...product, quantity: 1 }];

      this.saveToStorage(newList);
      return newList;
    });
  }

  decrease(productId: number) {
    this.items.update(list => {
      const newList = list
        .map(p =>
          p.id === productId
            ? { ...p, quantity: p.quantity - 1 }
            : p
        )
        .filter(p => p.quantity > 0);

      this.saveToStorage(newList);
      return newList;
    });
  }

  remove(productId: number) {
    this.items.update(list => {
      const newList = list.filter(p => p.id !== productId);
      this.saveToStorage(newList);
      return newList;
    });
  }

  clear() {
    this.items.set([]);
    this.saveToStorage([]);
  }
}