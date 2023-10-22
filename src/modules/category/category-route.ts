import express from 'express';
import { isAdmin, requiresSignin } from '../../middleware/auth-middleware';
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from './category-controller';
import multer from 'multer';
const categoryRoute = express.Router();

const upload = multer({
  storage: multer.memoryStorage()
});

categoryRoute.post('/category', requiresSignin, isAdmin, upload.single('categoryImage'), createCategory);
categoryRoute.get('/category', requiresSignin, getCategories);
categoryRoute.get('/category/:categoryId', requiresSignin, getCategory);
categoryRoute.put('/category/:categoryId', requiresSignin, isAdmin, updateCategory);
categoryRoute.delete('/category/:categoryId', requiresSignin, isAdmin, deleteCategory);

export default categoryRoute;