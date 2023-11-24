import { NextFunction, Response } from "express";
import { IRequest } from "../../types/common-types";
import Cart from './cart-model';
import { ICart, ICartItem, ICartItemInput } from "../../types/cart-types";

export const addProductToCart = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const cart = await Cart.findOne({ user: req.user?._id });
    if (cart) {
      //cart already exist update the cart by increasing the quantity
      let promisesArr: any[] = [];
      req.body.cartItems.forEach(async (cartItem: ICartItemInput) => {
        const product = cartItem.product;
        const item = cart.cartItems.find((item) => item.product.toString() === product);
        let condition: object, update: object;
        if (item) {
          cartItem.quantity = item.quantity + cartItem.quantity;
          condition = { 'user': req.user?._id, 'cartItems.product': product };
          update = {
            '$set': {
              'cartItems.$': cartItem
            }
          }
        } else {
          condition = { 'user': req.user?._id };
          update = {
            '$push': {
              'cartItems': cartItem
            }
          }
        }
        promisesArr.push(await Cart.findOneAndUpdate(condition, update, { upsert: true }))
      });
      const result = await Promise.all(promisesArr);
      if (result) {
        return res.status(200).json({ success: true, result });
      }
    } else {
      //If cart doesn't exist then create new one
      const newCartData = {
        user: req.user?._id,
        cartItems: req.body.cartItems
      }

      const cart = await Cart.create(newCartData);
      if (cart) {
        return res.status(201).json({ success: true, cart });
      }
    }
  } catch (error) {
    next(error);
  }
}

export const getUserCartItems = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const cart = await Cart.findOne({ user: req.user?._id })
      .populate('cartItems.product', '_id name sellingPrice maxRetailPrice productImages');
    if (!cart) {
      return res.status(400).json({ success: false, message: "cart not found" });
    }
    const formatedCartItems: any[] = [];
    cart?.cartItems.forEach((item: any) => {
      if (item && item.product) {
        formatedCartItems.push({
          _id: item.product.id,
          name: item.product.name,
          image: item.product.productImages && item.product.productImages.length ? item.product.productImages[0] : "",
          sellingPrice: item.product.sellingPrice,
          maxRetailPrice: item.product.sellingPrice,
          quantity: item.quantity,
        })
      }
    })
    return res.status(200).json({ success: true, cartItems: formatedCartItems });
  } catch (error) {
    next(error);
  }
}