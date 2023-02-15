import { IPlace } from "./../types/place";
import joi from "joi";
import { Request, Response, NextFunction } from "express";
import { errorFunction } from "../utils/errorFunction";

const validation = joi.object<IPlace>({
  name: joi.string().required().min(1).max(50),
  location: joi.string().required().min(1).max(50),
  address: joi.string().required().min(1).max(100),
  geographicalLocation: joi.string().required(),
  price: joi.number().required(),
  purpose: joi.string().required(),
  type: joi.string().required(),
  rating: joi.number().min(0).max(5),
  image: joi.array().min(1).max(8),
  openTime: joi.number().required(),
  closeTime: joi.number().required(),
  description: joi.string().required(),
});

export const placeValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validation.validate(req.body);
  if (error) {
    res.status(406);
    return res.json(
      errorFunction(true, 406, `Error in data: ${error.message}`)
    );
  } else {
    next();
  }
};
