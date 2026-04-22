import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../products/models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">

      <img [src]="product.image" />

      <h3>{{ product.title }}</h3>

      <p>{{ product.description }}</p>
      <p>{{ product.category }}</p>

      <p class="price">{{ product.price }} $</p>

      <button class="btn btn-primary" (click)="addToCart()">
        Add to Cart
      </button>

    </div>
  `,
  styles: [`
.card {
  background: #ffffff;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 35px rgba(0,0,0,0.12);
}


img {
  width: 100%;
  height: 180px;
  object-fit: contain;

  background: #f9fafb;
  border-radius: 12px;
  padding: 10px;
}


h3 {
  font-size: 15px;
  font-weight: 600;
  margin: 12px 0 6px;

  color: #1f2937;

 
  display: -webkit-box;
  -webkit-line-clamp: 2; 
  -webkit-box-orient: vertical;
  overflow: hidden;
}


p {
  font-size: 13px;
  color: #6b7280;
  margin: 2px 0;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}


p:nth-of-type(2) {
  font-size: 12px;
  color: #9ca3af;
}


.price {
  margin-top: auto;
  font-size: 18px;
  font-weight: 700;
  color: #2563eb;
}

button {
  margin-top: 12px;
  width: 100%;

  padding: 10px 14px;
  border: none;
  border-radius: 12px;

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  background: linear-gradient(90deg, #2563eb, #7c3aed);
  color: #fff;

  box-shadow: 0 6px 18px rgba(37, 99, 235, 0.25);

  transition: all 0.25s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 22px rgba(37, 99, 235, 0.35);
}

button:active {
  transform: scale(0.98);
}

button:disabled {
  background: #d1d5db;
  cursor: not-allowed;
  box-shadow: none;
}
`]
})
export class ProductCard {
  @Input() product!: Product;

  @Output() add = new EventEmitter<Product>();

  addToCart() {
    this.add.emit(this.product);
  }
  
}