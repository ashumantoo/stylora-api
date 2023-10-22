import JWT from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { IRequest } from '../types/common-types';
import { Roles } from '../types/user-types';

export const requiresSignin = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const user: any = JWT.verify(token, process.env.JWT_SECRET || "supersecret");
      req.user = {
        _id: user._id,
        role: user.role
      };
    } else {
      res.status(401).json({ message: "Authentication required" });
    }
    next();
  } catch (error) {
    next(error);
  }
}

export const isAdmin = async (req: IRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== Roles.ADMIN) {
    res.status(401).json({ success: false, message: "Access denied" });
  }
  next();
}

export const isUser = async (req: IRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== Roles.USER) {
    res.status(401).json({ success: false, message: "Access denied" });
  }
  next();
}