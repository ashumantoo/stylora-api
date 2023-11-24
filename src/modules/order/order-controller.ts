import { NextFunction, Response } from "express";
import { IRequest } from "../../types/common-types";
import Order from "./order-model";
import { Types } from "mongoose";
import Cart from "../cart/cart-model";
import { IOrderInput, OrderStatusEnum } from "../../types/order-types";


export const createOrder = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    req.body.user = req.user?._id;
    if (!req.body.paymentStatus) {
      req.body.status = 'PENDING';
    }
    const orderInput: IOrderInput = {
      ...req.body,
      orderStatus: [
        {
          status: OrderStatusEnum.ORDERED,
          date: new Date().toISOString(),
          isCompleted: true
        },
        {
          status: OrderStatusEnum.PACKED,
          isCompleted: false
        },
        {
          status: OrderStatusEnum.SHIPPED,
          isCompleted: false
        },
        {
          status: OrderStatusEnum.DELIVERED,
          isCompleted: false
        }
      ]
    }
    const newOrder = await Order.create(orderInput);
    await Cart.deleteOne({ user: req.user?._id });
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

export const adminUpdateOrderStatus = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const orderId = req.params.orderId;
    if (!Types.ObjectId.isValid(orderId)) {
      throw new Error("Invalid order Id");
    }
    await Order.updateOne(
      { _id: orderId, 'orderStatus.status': req.body.status },
      {
        $set: {
          'orderStatus.$': [
            { status: req.body.status, date: new Date().toISOString(), isCompleted: true }
          ]
        }
      }
    );
    const updatedOrder = await Order.findOne({ _id: orderId });
    return res.status(200).json({ success: true, updatedOrder });
  } catch (error) {
    next(error);
  }
}