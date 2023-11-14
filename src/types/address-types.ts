import { IUser } from "./user-types";

export interface IUserAddress {
  user: IUser;
  addresses: IUserAddress[]
}

export interface IUserAddressInput {
  user: string;
  address: IUserAddress;
}

export interface IUserAddress {
  name: string;
  mobileNumber: string;
  pincode: string;
  locality: string;
  buildingAndStreet: string;
  cityTown: string;
  state: string;
  landmark: string;
  alternateMobile?: string
  addressType: UserAddressType
}

export enum UserAddressType {
  HOME = 'HOME',
  WORK = 'WORK'
}