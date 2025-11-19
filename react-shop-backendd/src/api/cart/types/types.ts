import { Cart } from '../entities/cart.entity';

export type CartResponse = {
  totalPrice: number;
  totalProductsCount: number;
  items: Cart[];
};
