import express from 'express';
import { isUser, requiresSignin } from '../../middleware/auth-middleware';
import { addProductToCart, getUserCartItems, removeCartItem } from './cart-controller';
const cartRoutes = express.Router();

cartRoutes.post('/consumer/cart/addtocart', requiresSignin, isUser, addProductToCart);
cartRoutes.get('/consumer/cart/getcartitems', requiresSignin, isUser, getUserCartItems);
cartRoutes.put('/consumer/cart/removecartitem', requiresSignin, isUser, removeCartItem);

export default cartRoutes;