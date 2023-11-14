import mongoose, { Schema } from "mongoose";


const addressSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 50
  },
  mobileNumber: {
    type: String,
    required: true,
    trim: true,
    min: 10,
    max: 10
  },
  pincode: {
    type: String,
    required: true,
    trim: true,
    min: 6,
    max: 6
  },
  locality: {
    type: String,
    required: true,
    trim: true,
    min: 10,
    max: 100
  },
  buildingAndStreet: {
    type: String,
    required: true,
    trim: true,
    min: 10,
    max: 50
  },
  cityTown: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  landmark: {
    type: String,
    required: true,
    trim: true,
    min: 5,
    max: 100
  },
  alternateMobile: {
    type: String,
    trim: true,
    min: 10,
    max: 10
  },
  addressType: {
    type: String,
    required: true,
    enum: ['HOME', 'WORK']
  }
});

const userAddressSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  addresses: [addressSchema]
});

export default mongoose.model('UserAddress', userAddressSchema);