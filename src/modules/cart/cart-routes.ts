import express from 'express';
import { isAdmin, isUser, requiresSignin } from '../../middleware/auth-middleware';
import { addProductToCart } from './cart-controller';
const cartRoutes = express.Router();

cartRoutes.post('/cart/add-to-cart', requiresSignin, isUser, addProductToCart);

export default cartRoutes;