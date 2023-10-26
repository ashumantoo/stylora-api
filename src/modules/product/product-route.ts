import express from 'express';
import multer from 'multer';
import { isAdmin, requiresSignin } from '../../middleware/auth-middleware';
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from './product-controller';
const productRoutes = express.Router();

productRoutes.post('/product', requiresSignin, isAdmin, addProduct);
productRoutes.get('/product', requiresSignin, getProducts);
productRoutes.get('/product/:productId', requiresSignin, getProduct);
productRoutes.put('/product/:productId', requiresSignin, isAdmin, updateProduct);
productRoutes.delete('/product/:productId', requiresSignin, isAdmin, deleteProduct);

export default productRoutes;