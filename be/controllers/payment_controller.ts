import { NextFunction, Request, Response } from "express";
import Payments from "../models/payment";
import { errorFunction } from "../utils/errorFunction";

const paymentController = {
  addPayment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Payments.create(req.body);
      res.json(errorFunction(false, 200, "Thêm thành công", data));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { pageNumber, limit } = req.query;

      const SkipNumber = (Number(pageNumber) - 1) * Number(limit);

      const result = await Payments.find()
        .skip(SkipNumber)
        .limit(Number(limit))
        .populate("userId", ["userName", "email", "numberPhone"])
        .populate("orderId");

      res.json(errorFunction(false, 200, "Lấy thành công !", result));
    } catch (error) {
      res.status(400).json({
        error: error,
        message: "Bad request",
      });
    }
  },
};

export default paymentController;
