import { NextFunction, Response } from "express";
import { Types } from "mongoose";
import slugify from "slugify";
import { uploadImageToCloudinary } from "../../cloudinay-config";
import { IRequest } from "../../types/common-types";
import Product from "./product-model";
import Category from "../category/category.model";

export const addProduct = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const { name, description, maxRetailPrice, sellingPrice, category, quantity, status, productImages } = req.body;
    const newProduct = {
      name,
      slug: slugify(name),
      description,
      maxRetailPrice,
      sellingPrice,
      category,
      quantity,
      productImages,
      status,
      createdBy: req.user?._id,
    }
    const createdProduct = await Product.create(newProduct);
    res.status(201).json({ success: true, product: createdProduct });
  } catch (error) {
    next(error);
  }
}

export const getProducts = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find().populate('category').exec();
    res.status(200).json({ success: true, products });
  } catch (error) {
    next(error);
  }
}

export const getProduct = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.productId;
    if (!Types.ObjectId.isValid(productId)) {
      throw new Error("Invalid product Id");
    }
    const product = await Product.findById(productId);
    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
}

export const getProductsBySlug = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const slug = req.params.slug;
    const category = await Category.findOne({ slug: slug }).select("_id type");
    if (!category) {
      res.status(404).json({ success: false, message: "Category not found" });
    }
    const products = await Product.find({ category: category?._id });
    if (category?.type) {
      return res.status(200).json({
        success: true,
        products,
        productsByPrice: {
          under5k: products.filter(product => product.sellingPrice <= 5000),
          under10k: products.filter(product => product.sellingPrice > 5000 && product.sellingPrice <= 10000),
          under15k: products.filter(product => product.sellingPrice > 10000 && product.sellingPrice <= 15000),
          under20k: products.filter(product => product.sellingPrice > 15000 && product.sellingPrice <= 20000),
          under30k: products.filter(product => product.sellingPrice > 20000 && product.sellingPrice <= 30000),
        }
      });
    } else {
      return res.status(200).json({ success: true, products });
    }
  } catch (error) {
    next(error);
  }
}

export const updateProduct = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.productId;
    if (!Types.ObjectId.isValid(productId)) {
      throw new Error("Invalid product Id");
    }
    await Product.findByIdAndUpdate(productId, req.body);
    const updatedProduct = await Product.findById(productId);
    res.status(200).json({ success: true, updatedProduct });
  } catch (error) {
    next(error);
  }
}

export const deleteProduct = async (req: IRequest, res: Response, next: NextFunction) => {
  //TODO: only delete if product doesn't exists anywhere with no dependency
  try {
    const productId = req.params.productId;
    if (!Types.ObjectId.isValid(productId)) {
      throw new Error("Invalid product Id");
    }
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ success: true, message: "Product delete successfully" });
  } catch (error) {
    next(error);
  }
}