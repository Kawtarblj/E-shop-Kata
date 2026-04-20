import { Injectable, signal, computed } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  
  products = signal<Product[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private api: ApiService) {}

 async getProducts() {
  try {
    this.loading.set(true);
    this.error.set(null);

    const data = await this.api.get<Product[]>('products');

    this.products.set(data);

  } catch (err) {
    this.error.set('Erreur lors du chargement des produits');
  } finally {
    this.loading.set(false);
  }
}

  categories = computed(() => {
    return [...new Set(
      this.products()
        .map(p => p.category)
        .filter((c): c is string => !!c)
    )];
  });

  
  byCategory(category: string) {
    return this.products().filter(
      p => p.category === category
    );
  }
   
  clearProducts() {
    this.products.set([]);
    this.error.set(null);
  }
}