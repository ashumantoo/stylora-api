import { NextFunction, Response } from "express";
import { IRequest } from "../types/common-types";

export const validateRequest = (schema: any) => {
  return (req: IRequest, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (!error) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i: any) => i.message).join(',');
      res.status(422).json({ error: message })
    }
  }
}
