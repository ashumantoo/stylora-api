import { string } from "joi";
import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String
  },
  parentId: {
    type: String
  },
  imageUrl: {
    type: String
  }
}, { timestamps: true });

export default model("Category", categorySchema);