import type { Product } from '../products/types';import type { User } from '../auth/types';import type { CartItem } from '../cart/types';
export type OrderStatus = 1 | 2 | 3 | 4

export type Order = {
  id: number
  // user
  phone: string
  name: string
  surname: string
  lastname: string
  email: string
  // address
  region: string
  city: string
  street: string
  apartment: string
  house: string
  comment: string
  // rest
  price: number
  status: OrderStatus
  date: string
  user: User
  products: Product[]
}

export type CreateOrderPayload = {
  price: number
  user_id?: number
  surname: string
  name: string
  lastname: string
  email: string
  phone: string
  region: string
  city: string
  street: string
  house: string
  apartment: string
  status: OrderStatus
  comment?: string
  cart: CartItem[]
}

export type CreateOrderResponse = {
  order: Order
  message?: string
}

export type CreateOrder = (payload: CreateOrderPayload) => Promise<CreateOrderResponse>

export type GetOrders = (user_id: number) => Promise<Order[]>

export type GetOrder = (id: number, user_id: number) => Promise<Order>

export type GetAllOrders = () => Promise<Order[]>

export type OrdersContextProps = {
  createOrder: CreateOrder
  getOrders: GetOrders
  getOrder: GetOrder
  getAllOrders: GetAllOrders
}
