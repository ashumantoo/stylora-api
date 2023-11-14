import { NextFunction, Response } from "express";
import { IRequest } from "../../types/common-types";
import UserAddress from './address-model';
import { Types } from "mongoose";
import { IUserAddress } from "../../types/address-types";

export const createUserAddress = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    if (req.body.address) {
      const userAddress = await UserAddress
        .findOneAndUpdate({ user: req.user?._id }, {
          '$push': {
            'addresses': req.body.address
          }
        }, { new: true, upsert: true });
      return res.status(201).json({ success: true, addresses: userAddress.addresses });
    } else {
      return res.status(400).json({ success: false, message: 'addess is missing' })
    }
  } catch (error) {
    next(error);
  }
}

export const getUserAddresses = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const userAddress = await UserAddress.findOne({ user: req.user?._id });
    if (userAddress) {
      return res.status(200).json({ success: true, addresses: userAddress.addresses });
    } else {
      return res.status(200).json({ success: true, userAddress: null });
    }
  } catch (error) {
    next(error);
  }
}

export const getUserAddress = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const addressId = req.params.addressId;
    if (!Types.ObjectId.isValid(addressId)) {
      throw new Error("Invalid address Id");
    }
    const userAddress = await UserAddress.findOne({ user: req.user?._id });
    const matchedUserAddress = userAddress?.addresses.find((address) => address._id?.toString() === addressId);
    if (matchedUserAddress) {
      return res.status(200).json({ success: true, address: matchedUserAddress });
    } else {
      return res.status(400).json({ success: false, message: "Address not found" });
    }
  } catch (error) {
    next(error);
  }
}

export const updateUserAddress = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const addressId = req.params.addressId;
    if (!Types.ObjectId.isValid(addressId)) {
      throw new Error("Invalid address Id");
    }
    const userAddress = await UserAddress.findOne({ user: req.user?._id });
    const foundUserAddressIndex = userAddress?.addresses.findIndex((address: any) => address._id?.toString() === addressId);
    if (foundUserAddressIndex !== undefined && foundUserAddressIndex > -1) {
      userAddress?.addresses.set(foundUserAddressIndex, req.body.address);
      const updatedUserAddress = await userAddress?.save();
      return res.status(200).json({ success: true, address: updatedUserAddress?.addresses[foundUserAddressIndex] });
    } else {
      return res.status(400).json({ success: false, message: "Address not found" });
    }
  } catch (error) {
    next(error);
  }
}

export const removeUserAddress = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const addressId = req.params.addressId;
    if (!Types.ObjectId.isValid(addressId)) {
      throw new Error("Invalid address Id");
    }
    const userAddress = await UserAddress.findOne({ user: req.user?._id });
    const filteredUserAddress = userAddress?.addresses.filter((address) => address._id?.toString() !== addressId);
    // const updatedAddress = await UserAddress.findOneAndUpdate({ user: req.user?._id }, filteredUserAddress, { returnDocument: "after" });
    userAddress?.set('addresses', filteredUserAddress);
    const updatedAddress = await userAddress?.save();
    return res.status(200).json({ success: true, addresses: updatedAddress?.addresses });
  } catch (error) {
    next(error);
  }
}