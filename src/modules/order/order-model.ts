import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserAddress.addresses',
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      payableAmount: {
        type: Number,
        required: true
      },
      purchaseQuantity: {
        type: Number,
        required: true
      }
    }
  ],
  status: {
    type: String,
    enum: ['PENDING', 'CONFIRMED', 'CANCELLED', 'DISPATCHED', 'DELIVERED'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['PENDING', 'CANCELLED', 'COMPLETED', 'REFUND'],
    require: true
  }
}, { timestamps: true })

export default mongoose.model('Order', OrderSchema);