import { Schema, model } from "mongoose";

const productSchema = new Schema({
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
  description: {
    type: String
  },
  maxRetailPrice: {
    type: Number,
    required: true,
    min: 1
  },
  sellingPrice: {
    type: Number,
    required: true,
    min: 1
  },
  quantity: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ['ACTIVE', 'IN_ACTIVE'],
      message: '{VALUE} is not supported'
    }
  },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  productImages: [
    { imgUrl: { type: String } }
  ],
  reviews: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      review: { type: String }
    }
  ]
}, { timestamps: true });

export default model("Product", productSchema);