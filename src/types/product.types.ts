import { ICategory } from "./category-types";
import { IUser } from "./user-types";

export enum ProductStatus {
  ACTIVE = "ACTIVE",
  IN_ACTIVE = "IN_ACTIVE"
}

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  maxRetailPrice: number;
  sellingPrice: number;
  quantity: number;
  category: ICategory;
  status: ProductStatus;
  createdBy: IUser;
  productImages: IProductImage[];
  reviews: IReview[]
}

export interface IReview {
  user: IUser;
  review: string;
}

export interface IProductImage {
  _id: string;
  imgUrl: string;
}