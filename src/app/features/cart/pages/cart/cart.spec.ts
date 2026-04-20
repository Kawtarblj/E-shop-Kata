import { CartService } from '../../services/cart.service';

describe('CartService', () => {
  let service: CartService;

  const product = {
    id: 1,
    title: 'Test',
    price: 10,
    image: '',
    rating: {
      rate: 4,
      count: 100
    }
  };

  beforeEach(() => {
    localStorage.clear();
    service = new CartService();
  });

  it('should add product to cart', () => {
    service.add(product);

    expect(service.cartItems().length).toBe(1);
    expect(service.cartItems()[0].quantity).toBe(1);
  });

  it('should increase quantity if product already exists', () => {
    service.add(product);
    service.add(product);

    expect(service.cartItems().length).toBe(1);
    expect(service.cartItems()[0].quantity).toBe(2);
  });

  it('should remove product from cart', () => {
    service.add(product);
    service.remove(1);

    expect(service.cartItems().length).toBe(0);
  });

  it('should calculate total price correctly', () => {
    service.add(product);
    service.add(product);

    expect(service.total()).toBe(20);
  });
});