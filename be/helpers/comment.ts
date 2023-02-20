import { NextFunction, Request, Response } from "express";
import joi from "joi";
import { errorFunction } from "../utils/errorFunction";
import { IComment } from "./../types/comment";

const validation = joi.object<IComment>({
  userId: joi.string().required(),
  content: joi.string().required(),
  dateTime: joi.number().required(),
  postId: joi.string().required(),
});

export const commentValidation = async (
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
