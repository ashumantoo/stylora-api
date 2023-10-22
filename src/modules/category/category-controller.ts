import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import slugify from 'slugify';
import { ICategory } from '../../types/category-types';
import Category from './category.model';
import { uploadImageToCloudinary } from '../../cloudinay-config';

function formatCagtegories(categories: ICategory[], parentId?: string) {
  const formattedCategories: ICategory[] = [];
  let filtredCategory: ICategory[] = [];
  if (!parentId) {
    filtredCategory = categories.filter((c) => !c.parentId);
  } else {
    filtredCategory = categories.filter(c => c.parentId === parentId);
  }
  for (const cat of filtredCategory) {
    formattedCategories.push({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      parentId: cat.parentId,
      subCategories: formatCagtegories(categories, cat._id.toString())
    })
  }
  return formattedCategories;
}

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let imageUrl = "";
    if (req.file) {
      const response = await uploadImageToCloudinary(req.file, 'categories');
      if (response) {
        imageUrl = response.secure_url;
      }
    }

    const categoryData = {
      name: req.body.name,
      slug: slugify(req.body.name),
      parentId: "",
      categoryImage: imageUrl
    }

    if (req.body.parentId) {
      categoryData.parentId = req.body.parentId
    }
    const category = await Category.create(categoryData);
    res.status(201).json({ success: true, category });
  } catch (error) {
    next(error);
  }
}

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories: ICategory[] = await Category.find();
    const _formattedCategories = formatCagtegories(categories);
    res.status(200).json({ success: true, categories: _formattedCategories });
  } catch (error) {
    next(error);
  }
}

export const getCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryId = req.params.categoryId;
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      throw new Error("Invalid category Id");
    }
    const category = await Category.findById(categoryId).exec();
    res.status(200).json({ success: true, category });
  } catch (error) {
    next(error);
  }
}

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryId = req.params.categoryId;
    const updatedCategoryData = {
      name: req.body.name,
      slug: slugify(req.body.name),
      parentId: ""
    }
    if (req.body.parentId) {
      updatedCategoryData.parentId = req.body.parentId
    }
    await Category.findByIdAndUpdate(categoryId, updatedCategoryData);
    const updatedCategory = await Category.findById(categoryId);
    res.status(200).json({ success: true, updatedCategory });
  } catch (error) {
    next(error);
  }
}

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  //TODO: Check if there is any product releted this category - don't allow to delete
  try {
    const categoryId = req.params.categoryId;
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      throw new Error("Invalid category Id");
    }
    await Category.findByIdAndDelete(categoryId);
    res.status(200).json({ success: true, message: "Document deleted sucessfully" });
  } catch (error) {
    next(error);
  }
}