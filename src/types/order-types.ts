import { IUserAddress } from "./address-types";
import { IProduct } from "./product.types";
import { IUser } from "./user-types";

export interface IOrderInput {
  user: string;
  address: string;
  totalAmount: number;
  referenceNumber: string;
  items: IOrderItemInput[];
  paymentType: string;
  paymentStatus: string;
  orderStatus: IOrderStatus[];
}

export interface IOrderStatus {
  status: string;
  date: string;
  isCompleted: boolean;
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
  referenceNumber:string;
  items: IOrderItem[];
  paymentType: string;
  paymentStatus: string;
  orderStatus: IOrderStatus[];
}

export interface IOrderItem {
  product: IProduct;
  payableAmount: number;
  purchaseQuantity: number;
}

export enum OrderStatusEnum {
  ORDERED = 'ORDERED',
  PACKED = 'PACKED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED'
}