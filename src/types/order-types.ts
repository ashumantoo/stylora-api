import { IUserAddress } from "./address-types";
import { IProduct } from "./product.types";
import { IUser } from "./user-types";

export interface IOrderInput {
  user: string;
  address: string;
  totalAmount: number;
  items: IOrderItemInput[];
}

export interface IOrderItemInput {
  product: string;
  payableAmount: number;
  purchaseQuantity: number;
}

export interface IOrder {
  _id: string;
  user: IUser;
  address: IUserAddress
  totalAmount: number;
  items: IOrderItem[];
}

export interface IOrderItem {
  product: IProduct;
  payableAmount: number;
  purchaseQuantity: number;
}