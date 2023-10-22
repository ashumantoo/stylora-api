import express from 'express';
import multer from 'multer';
import { isAdmin, requiresSignin } from '../../middleware/auth-middleware';
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from './product-controller';
const productRoutes = express.Router();

const upload = multer({
  storage: multer.memoryStorage()
});

productRoutes.post('/product', requiresSignin, isAdmin, upload.array("productImage"), addProduct);
productRoutes.get('/product', requiresSignin, getProducts);
productRoutes.get('/product/:productId', requiresSignin, getProduct);
productRoutes.put('/product/:productId', requiresSignin, isAdmin, upload.array("productImage"), updateProduct);
productRoutes.delete('/product/:productId', requiresSignin, isAdmin, deleteProduct);

export default productRoutes;