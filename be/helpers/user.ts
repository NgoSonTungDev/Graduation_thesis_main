import { IUser } from "./../types/user";
import joi from "joi";
import { Request, Response, NextFunction } from "express";
import { errorFunction } from "../utils/errorFunction";

const validation = joi.object<IUser>({
  codeOtp: joi.number(),
  userName: joi.string().required().min(5).max(50),
  email: joi.string().required().email(),
  password: joi.string().min(6).max(20).required(),
  address: joi.string(),
  avt: joi.string(),
  numberPhone: joi.string(),
  gender: joi.string(),
<<<<<<< HEAD
  description: joi.string(),
=======
>>>>>>> 1cfb0d1833de85cb8e57879d294423887399f3d3
  isAdmin: joi.number(),
});

export const userValidation = async (
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
