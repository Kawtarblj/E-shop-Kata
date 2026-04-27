import { TestBed } from '@angular/core/testing';
import { ProductService } from '../../services/product.service';
import { ApiService } from '../../../../core/services/api.service';

describe('ProductService (simple)', () => {
  let service: ProductService;

  const mockProducts = [
    { id: 1, title: 'A', price: 10, image: '', category: 'tech' },
    { id: 2, title: 'B', price: 20, image: '', category: 'food' },
  ];

  const apiMock = {
    get: () => Promise.resolve(mockProducts)
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        { provide: ApiService, useValue: apiMock }
      ]
    });

    service = TestBed.inject(ProductService);
  });

  it('should load products', async () => {
    await service.getProducts();

    expect(service.products().length).toBe(2);
  });

  it('should get categories', async () => {
    await service.getProducts();

    expect(service.categories()).toEqual(['tech', 'food']);
  });

  it('should filter by category', async () => {
    await service.getProducts();

    const result = service.byCategory('tech');

    expect(result.length).toBe(1);
  });
});