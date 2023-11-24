import express from 'express';
import { isAdmin, isUser, requiresSignin } from '../../middleware/auth-middleware';
import { adminUpdateOrderStatus, createOrder, getOrder, getOrders, getUserOrders } from './order-controller';

const orderRoutes = express.Router();

orderRoutes.get('/order', requiresSignin, isAdmin, getOrders);
orderRoutes.get('/order/:orderId', requiresSignin, isAdmin, getOrder);
orderRoutes.put('/order/:orderId', requiresSignin, isAdmin, adminUpdateOrderStatus);

//customer routes
orderRoutes.post('/consumer/order', requiresSignin, isUser, createOrder);
orderRoutes.get('/consumer/order', requiresSignin, isUser, getUserOrders);
orderRoutes.get('/consumer/order/:orderId', requiresSignin, isUser, getOrder);


export default orderRoutes;