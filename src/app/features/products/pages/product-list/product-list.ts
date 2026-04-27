import { Component, inject, signal } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { CartService } from '../../../cart/services/cart.service';
import { ProductService } from '../../services/product.service';
import { ProductCard } from '../../components/product-card/product-card';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {

  private productService = inject(ProductService);
  private cart = inject(CartService);
  productssearch = this.productService.filteredProducts;
  products = this.productService.products;
  loading = this.productService.loading;
clearSearch() {
  this.productService.clearsearch();
}
  pageSize = 3;

  categoryIndex = signal<Record<string, number>>({});

  constructor() {this.productService.getProducts(); }
  

  onAddToCart(product: Product) { this.cart.add(product);}
  categories() { return this.productService.categories();}

  byCategory(cat: string) { return this.productService.byCategory(cat);}

  getVisibleProducts(category: string) {
    const start = this.categoryIndex()[category] || 0;
    const products = this.byCategory(category);

    return products.slice(start, start + this.pageSize);
  }

  next(category: string) {
    const products = this.byCategory(category);
    const current = this.categoryIndex()[category] || 0;

    let nextIndex = current + this.pageSize;

    if (nextIndex >= products.length) {
      nextIndex = 0;
    }

    this.categoryIndex.update(state => ({
      ...state,
      [category]: nextIndex
    }));
  }

  
}