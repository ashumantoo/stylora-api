import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { ICategoryPageInput, IPageContent } from '../../types/page-types';
import { IRequest } from '../../types/common-types';
import Category from '../category/category.model';
import Page from './page-model';
import { ICategory } from '../../types/category-types';


//TODO:add a check to check if a selected category has already page exists or not
// while creating and updating
export const createCategoryPage = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const newCategoryPageData: ICategoryPageInput = {
      title: req.body.title,
      description: req.body.description || "",
      category: req.body.category,
      banners: [],
      products: [],
      createdBy: req.user?._id || "",
    }
    const category: ICategory | null = await Category.findById(req.body.category);
    if (!category) {
      res.status(400).json({ success: false, message: "Invalid category Id" });
    }

    if (category && !category.type) {
      res.status(400).json({ success: false, message: "Category type is missing in category" });
    }

    if (req.body.banners && req.body.banners.length) {
      newCategoryPageData.banners = req.body.banners.map((banner: IPageContent) => ({
        ...banner,
        navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${category?.type?.toLowerCase()}`
      }
      ));
    }
    if (req.body.products && req.body.products.length) {
      newCategoryPageData.products = req.body.products.map((product: IPageContent) => ({
        ...product,
        navigateTo: `/productClicked?categoryId=${req.body.category}&type=${category?.type?.toLowerCase()}`
      }
      ));
    }
    const newCategoryPage = await Page.create(newCategoryPageData);
    res.status(201).json({ success: true, newCategoryPage });
  } catch (error) {
    next(error);
  }
}

export const getCategoryPages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoriesPage = await Page.find()
      .populate({ path: 'category', select: ['_id', 'name', 'type'] })
      .populate({ path: 'createdBy', select: ['_id', 'firstName', 'lastName', 'email'] })
      .exec();
    res.status(200).json({ success: true, categoriesPage });
  } catch (error) {
    next(error);
  }
}

export const getCategoryPage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pageId = req.params.pageId;
    if (!mongoose.Types.ObjectId.isValid(pageId)) {
      throw new Error("Invalid category page Id");
    }
    const categoryPage = await Page.findById(pageId).exec();
    res.status(200).json({ success: true, categoryPage });
  } catch (error) {
    next(error);
  }
}

export const updateCategoryPage = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const pageId = req.params.pageId;
    const updatedCategoryPageData: ICategoryPageInput = {
      title: req.body.title,
      description: req.body.description || "",
      category: req.body.category,
      banners: [],
      products: [],
      createdBy: req.user?._id || "",
    }

    const category: ICategory | null = await Category.findById(req.body.category);
    if (!category) {
      res.status(400).json({ success: false, message: "Invalid category Id" });
    }

    if (category && !category.type) {
      res.status(400).json({ success: false, message: "Category type is missing in category" });
    }

    if (req.body.banners && req.body.banners.length) {
      updatedCategoryPageData.banners = req.body.banners.map((banner: IPageContent) => ({
        ...banner,
        navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${category?.type?.toLowerCase()}`
      }
      ));
    }
    if (req.body.products && req.body.products.length) {
      updatedCategoryPageData.products = req.body.products.map((product: IPageContent) => ({
        ...product,
        navigateTo: `/productClicked?categoryId=${req.body.category}&type=${category?.type?.toLowerCase()}`
      }
      ));
    }

    await Page.findByIdAndUpdate(pageId, updatedCategoryPageData);
    const updatedCategoryPage = await Page.findById(pageId);
    res.status(200).json({ success: true, updatedCategoryPage });
  } catch (error) {
    next(error);
  }
}

export const deleteCategoryPage = async (req: Request, res: Response, next: NextFunction) => {
  //TODO: Check if there is any product releted this category - don't allow to delete
  try {
    const pageId = req.params.pageId;
    if (!mongoose.Types.ObjectId.isValid(pageId)) {
      throw new Error("Invalid category page Id");
    }
    await Page.findByIdAndDelete(pageId);
    res.status(200).json({ success: true, message: "Document deleted sucessfully" });
  } catch (error) {
    next(error);
  }
}