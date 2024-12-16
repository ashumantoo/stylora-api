import express, { NextFunction, Request, Response } from 'express';
import env from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'
import morgan from 'morgan';

import userAuthRouter from './modules/auth/user-auth-route';
import adminAuthRoute from './modules/auth/admin-auth-route';
import categoryRoute from './modules/category/category-route';
import productRoutes from './modules/product/product-route';
import cartRoutes from './modules/cart/cart-routes';
import categoryPageRoute from './modules/page/page-route';
import userAddressRoutes from './modules/address/address-routes';
import orderRoutes from './modules/order/order-routes';

const app = express();

//environment variable/constant
env.config();

//Database connection
mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.1gkcp.mongodb.net/flipkart-clone?retryWrites=true&w=majority`
).then(() => {
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
app.use("/api/user", userAuthRouter); //TODO:check api end point has been changed earlier it was /api/signin -> /sign/user/signin
app.use("/api/admin", adminAuthRoute);
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