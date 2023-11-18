import express from 'express';
import { isAdmin, isUser, requiresSignin } from '../../middleware/auth-middleware';
import { createOrder, getOrder, getOrders } from './order-controller';

const orderRoutes = express.Router();

orderRoutes.get('/order', requiresSignin, isAdmin, getOrders)
orderRoutes.get('/order/:orderId', requiresSignin, isAdmin, getOrder)

//customer routes
orderRoutes.post('/consumer/order', requiresSignin, isUser, createOrder)
orderRoutes.get('/consumer/order', requiresSignin, isUser, getOrders)
orderRoutes.get('/consumer/order/:orderId', requiresSignin, isUser, getOrder)


export default orderRoutes;