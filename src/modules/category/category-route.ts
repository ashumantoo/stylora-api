import express from 'express';
import { isAdmin, requiresSignin } from '../../middleware/auth-middleware';
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from './category-controller';

const categoryRoute = express.Router();

categoryRoute.post('/category', requiresSignin, isAdmin, createCategory);
categoryRoute.get('/category', requiresSignin, getCategories);
categoryRoute.get('/category/:categoryId', requiresSignin, getCategory);
categoryRoute.put('/category/:categoryId', requiresSignin, isAdmin, updateCategory);
categoryRoute.delete('/category/:categoryId', requiresSignin, isAdmin, deleteCategory);

categoryRoute.get('/consumer/category', getCategories);

export default categoryRoute;