import { Injectable, signal, computed, inject } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Product } from '../models/product.model';
import { SearchService } from '../../../core/services/search.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  
  products = signal<Product[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  //constructor(private api: ApiService) {}
  private searchService = inject(SearchService);
  private api=inject(ApiService);
filteredProducts = computed(() => {
  const search = this.searchService.searchTerm().toLowerCase().trim();

  if (!search) {
    return []; 
  }

  return this.products().filter(p =>
    p.title.toLowerCase().includes(search)
  );
});
clearsearch(){this.searchService.clearSearch();}


 getProducts() {
  this.loading.set(true);
  this.error.set(null);

  this.api.get<Product[]>('products')
    .subscribe({
      next: (data) => {
        this.products.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Erreur lors du chargement des produits');
        this.loading.set(false);
      }
    });
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