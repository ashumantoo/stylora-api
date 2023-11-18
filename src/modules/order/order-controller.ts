import { NextFunction, Response } from "express";
import { IRequest } from "../../types/common-types";
import Order from "./order-model";
import { Types } from "mongoose";


export const createOrder = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    req.body.user = req.user?._id;
    req.body.status = "CONFIRMED";
    if (!req.body.paymentStatus) {
      req.body.status = 'PENDING';
    }
    const newOrder = await Order.create(req.body);
    if (newOrder) {
      return res.status(201).json({ success: true, newOrder });
    } else {
      return res.status(500).json({ success: false, message: "Something went wrong" });
    }
  } catch (error) {
    next(error)
  }
}

export const getOrders = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const orders = await Order
      .find({ user: req.user?._id })
      .populate('items.product', '_id name productImages');
    if (orders && orders.length) {
      return res.status(200).json({ success: true, orders });
    } else {
      return res.status(200).json({ success: true, orders: [] });
    }
  } catch (error) {
    next(error)
  }
}

export const getOrder = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const orderId = req.params.orderId;
    if (!Types.ObjectId.isValid(orderId)) {
      throw new Error("Invalid order Id");
    }
    const order = await Order.findOne({ _id: orderId }).populate('items.product', '_id name productImages');;
    if (order) {
      return res.status(200).json({ success: true, order });
    } else {
      return res.status(400).json({ success: true, message: "Order not found" });
    }
  } catch (error) {
    next(error)
  }
}