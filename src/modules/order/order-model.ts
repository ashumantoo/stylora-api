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
  orderStatus: [
    {
      status: {
        type: String,
        enum: ['ORDERED', 'PACKED', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
        required: true,
        default: 'ORDERED'
      },
      date: {
        type: Date
      },
      isCompleted: {
        type: Boolean,
        default: false
      }
    }
  ],
  paymentType: {
    type: String,
    enum: ['COD', 'CARD'],
    default: 'COD'
  },
  paymentStatus: {
    type: String,
    enum: ['PENDING', 'CANCELLED', 'COMPLETED', 'REFUND'],
    require: true
  }
}, { timestamps: true })

export default mongoose.model('Order', OrderSchema);