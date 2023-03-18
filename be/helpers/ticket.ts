import { NextFunction, Request, Response } from "express";
import joi from "joi";
import { errorFunction } from "../utils/errorFunction";
import { ITicket } from "./../types/ticket";

const validation = joi.object<ITicket>({
  placeId: joi.string().required(),
  salesAgentId: joi.string().required(),
  adultTicket: joi.number().min(10000).required(),
  childTicket: joi.number().min(10000).required(),
  numberTickets: joi.number().min(1).required(),
});

export const ticketValidation = async (
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
