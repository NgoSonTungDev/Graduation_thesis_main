import { IOrder } from "./../types/order";
import joi from "joi";
import { Request, Response, NextFunction } from "express";
import { errorFunction } from "../utils/errorFunction";

const validation = joi.object<IOrder>({
  codeOrder: joi.string(),
  userId: joi.string().required(),
  adultTicket: joi.number().required(),
  childTicket: joi.number().required(),
  total: joi.number().required(),
  description: joi.string().required(),
  status: joi.number(),
  dateTime: joi.number().required(),
  placeId: joi.string().required(),
  salesAgentId: joi.string().required(),
  ticketId: joi.string().required(),
});

export const orderValidation = async (
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
