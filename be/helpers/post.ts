import { IPost } from "./../types/post";
import joi from "joi";
import { Request, Response, NextFunction } from "express";
import { errorFunction } from "../utils/errorFunction";

const validation = joi.object<IPost>({
  content: joi.string().required(),
  image: joi.string().required(),
  placeId: joi.string().required(),
  userId: joi.string().required(),
  rating: joi.number().required().min(0).max(5),
  time: joi.number().required(),
});

export const postValidation = async (
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
