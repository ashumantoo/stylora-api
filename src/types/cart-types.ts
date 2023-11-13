import { IProduct } from "./product.types";
import { IUser } from "./user-types";

export interface ICart {
  _id: string;
  user: IUser;
  cartItems: ICartItem[]
}

export interface ICartItem {
  _id: string;
  product: IProduct;
  quantity: number;
}

export interface ICartInput {
  cartItems: ICartItemInput
}

export interface ICartItemInput {
  product: string
  quantity: number;
}