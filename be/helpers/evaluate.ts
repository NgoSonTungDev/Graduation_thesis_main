import { IEValuate } from "./../types/evaluate";
import joi from "joi";
import { Request, Response, NextFunction } from "express";
import { errorFunction } from "../utils/errorFunction";

const validation = joi.object<IEValuate>({
  userId: joi.string().required(),
  content: joi.string().required(),
  dateTime: joi.number().required(),
  rating: joi.number().max(5).required(),
  placeId: joi.string().required(),
});

export const evaluateValidation = async (
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
