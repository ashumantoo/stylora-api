import mongoose, { Schema, model } from "mongoose";

const PageSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    unique: true
  },
  banners: [
    {
      imgUrl: { type: String },
      navigateTo: { type: String }
    }
  ],
  products: [
    {
      imgUrl: { type: String },
      navigateTo: { type: String }
    }
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
    unique: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true

  }
}, { timestamps: true });

export default model("Page", PageSchema);