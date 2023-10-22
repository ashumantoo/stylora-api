import { NextFunction, Response } from "express";
import { IRequest } from "../../types/common-types";
import Cart from './cart-model';

export const addProductToCart = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const existingCart = await Cart.findOne({ user: req.user?._id });
    if (existingCart) {
      //update the existing cart by increaing the quantity or add new item to the cart
      const _productItem = req.body.cartItem.product;
      const existingItem = existingCart.cartItems.find(c => c.product.toString() === _productItem);
      if (existingItem) {
        //update the quantity
        await Cart.findOneAndUpdate({ user: req.user?._id, "cartItems.product": _productItem }, {
          "$set": {
            "cartItems.$": {
              ...req.body.cartItem,
              quantity: existingItem.quantity + req.body.cartItem.quantity
            }
          }
        }).exec();
        // res.status(200).json({ sucess: true, cart: _updatedCart })
      } else {
        //Insert the new item to the cart
        await Cart.findOneAndUpdate({ user: req.user?._id }, {
          "$push": {
            "cartItems": req.body.cartItem
          }
        }).exec();
        // res.status(201).json({ sucess: true, cart: _updatedCart })
      }
      const updatedCart = await Cart.findOne({ user: req.user?._id });
      res.status(201).json({ sucess: true, cart: updatedCart });
    } else {
      //If no existingcart then create new cart for the user
      const newCart = await Cart.create({
        user: req.user?._id,
        cartItems: [req.body.cartItem]
      })
      res.status(201).json({ sucess: true, cart: newCart });
    }
  } catch (error) {
    next(error);
  }
}