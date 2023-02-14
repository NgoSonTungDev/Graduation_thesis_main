import joi from "joi";
import { Request, Response, NextFunction } from "express";
import { IPurpose_type } from "../types/purpose_type";
import { errorFunction } from "../utils/errorFunction";

const validation = joi.object<IPurpose_type>({
  name: joi.string().required().max(50),
});

export const purposeTypeValidation = async (
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
