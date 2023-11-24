import express, { NextFunction, Request, Response } from 'express';
import env from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'

import userAuthRouter from './src/modules/auth/user-auth-route';
import adminAuthRoute from './src/modules/auth/admin-auth-route';
import categoryRoute from './src/modules/category/category-route';
import productRoutes from './src/modules/product/product-route';
import cartRoutes from './src/modules/cart/cart-routes';
import categoryPageRoute from './src/modules/page/page-route';
import userAddressRoutes from './src/modules/address/address-routes';
import morgan from 'morgan';
import orderRoutes from './src/modules/order/order-routes';

import { customAlphabet } from 'nanoid';

const app = express();

//environment variable/constant
env.config();

//Database connection
mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.1gkcp.mongodb.net/flipkart-clone?retryWrites=true&w=majority`
).then(() => {
  const nanoid = customAlphabet('1234567890abcdef', 10);
  console.log(nanoid(7).toUpperCase())
  console.log("Connected to database")
})
  .catch((err: any) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());

app.use(morgan('combined'));

//Routes
app.use("/api", userAuthRouter);
app.use("/api", adminAuthRoute);
app.use("/api", categoryRoute);
app.use('/api', categoryPageRoute);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', userAddressRoutes);
app.use('/api', orderRoutes);

//error handler at the app level
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500);
  res.json({
    message: err.message,
    error: err
  });
})
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})