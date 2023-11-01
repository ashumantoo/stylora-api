import express from 'express';
import { isAdmin, requiresSignin } from '../../middleware/auth-middleware';
import { createCategoryPage, deleteCategoryPage, getCategoryPage, getCategoryPages, updateCategoryPage } from './page-controller';

const categoryPageRoute = express.Router();

categoryPageRoute.post('/category-page', requiresSignin, isAdmin, createCategoryPage);
categoryPageRoute.get('/category-page', requiresSignin, isAdmin, getCategoryPages);
categoryPageRoute.get('/category-page/:pageId', requiresSignin, isAdmin, getCategoryPage);
categoryPageRoute.put('/category-page/:pageId', requiresSignin, isAdmin, updateCategoryPage);
categoryPageRoute.delete('/category-page/:pageId', requiresSignin, isAdmin, deleteCategoryPage);


export default categoryPageRoute;