import { NextFunction, Request, Response } from 'express';
import User from './user-model';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).json({
        message: "Admin already exists"
      })
    }
    const { firstName, lastName, email, password, mobile } = req.body;
    const hash_password = bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      hash_password,
      mobile,
      role: "ADMIN"
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      status: 201,
      message: "Admin user created successfully"
    })
  } catch (error) {
    next(error);
  }
}

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: any = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Admin not found"
      })
    }
    if (user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "User is not admin"
      })
    }
    const passwordMatched = await bcrypt.compare(req.body.password, user.hash_password);
    if (!passwordMatched) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password"
      });
    }
    //since we have a valid use with email and password generate token here
    const token = JWT.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET || "supersecret", { expiresIn: "1d" });
    const { _id, firstName, lastName, email, role, fullName } = user;
    res.status(200).json({
      token,
      user: { _id, firstName, lastName, email, role, fullName }
    });
  } catch (error: any) {
    next(error)
  }
}

export const verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: any = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Admin not found"
      })
    }
  } catch (error) {
    next(error);
  }
}