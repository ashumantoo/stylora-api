import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { ICategoryPage, ICategoryPageInput } from '../../types/page-types';
import { IRequest } from '../../types/common-types';
import Category from '../category/category.model';
import Page from './page-model';
import { ICategory } from '../../types/category-types';


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
      newCategoryPageData.banners = req.body.banners.map((bannerUrl: string) => ({
        imgUrl: bannerUrl,
        navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${category?.type?.toLowerCase()}`
      }
      ));
    }
    if (req.body.products && req.body.products.length) {
      newCategoryPageData.products = req.body.products.map((productImgUrl: string) => ({
        imgUrl: productImgUrl,
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
    const categoryPages = await Page.find()
      .populate({ path: 'category', select: ['_id', 'name', 'type'] })
      .populate({ path: 'createdBy', select: ['_id', 'firstName', 'lastName', 'email'] })
      .exec();
    res.status(200).json({ success: true, categoryPages });
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

export const updateCategoryPage = async (req: Request, res: Response, next: NextFunction) => {
  // try {
  //   const categoryId = req.params.categoryId;
  //   const updatedCategoryData = {
  //     name: req.body.name,
  //     slug: slugify(req.body.name),
  //     type: req.body.type || "",
  //     imageUrl: req.body.imageUrl ? req.body.imageUrl : "",
  //     parentId: ""
  //   }
  //   if (req.body.parentId) {
  //     updatedCategoryData.parentId = req.body.parentId
  //   }
  //   await Category.findByIdAndUpdate(categoryId, updatedCategoryData);
  //   const updatedCategory = await Category.findById(categoryId);
  //   res.status(200).json({ success: true, updatedCategory });
  // } catch (error) {
  //   next(error);
  // }
}

export const deleteCategoryPage = async (req: Request, res: Response, next: NextFunction) => {
  //TODO: Check if there is any product releted this category - don't allow to delete
  // try {
  //   const categoryId = req.params.categoryId;
  //   if (!mongoose.Types.ObjectId.isValid(categoryId)) {
  //     throw new Error("Invalid category Id");
  //   }
  //   await Category.findByIdAndDelete(categoryId);
  //   res.status(200).json({ success: true, message: "Document deleted sucessfully" });
  // } catch (error) {
  //   next(error);
  // }
}