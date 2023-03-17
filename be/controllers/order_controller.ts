import { IOrder } from "./../types/order";
import { errorFunction } from "../utils/errorFunction";
import { Request, Response, NextFunction } from "express";
import Orders from "../models/order";
import Payments from "../models/payment";

const fakeCode = (length: number) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

const orderController = {
  addOrder: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Orders.create<IOrder>({
        ...req.body,
        codeOrder: String(fakeCode(8)),
        amount: req.body.adultTicket + req.body.childTicket,
      });
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
      const { pageNumber, limit, status } = req.query;

      const SkipNumber = (Number(pageNumber) - 1) * Number(limit);

      const condition = status ? { status: status } : {};

      const result = await Orders.find(condition)
        .skip(SkipNumber)
        .limit(Number(limit))
        .populate("userId", ["userName", "email"])
        .populate("placeId", "name")
        .populate("salesAgentId", ["code", "userName"]);

      const allOrder = await Orders.find(condition);

      let totalPage = 0;
      if (allOrder.length % Number(limit) === 0) {
        totalPage = allOrder.length / Number(limit);
      } else {
        totalPage = Math.floor(allOrder.length / Number(limit) + 1);
      }

      res.json(
        errorFunction(false, 200, "Lấy thành công !", {
          totalPage: totalPage,
          total: allOrder.length,
          data: result,
        })
      );
    } catch (error) {
      res.status(400).json({
        error: error,
        message: "Bad request",
      });
    }
  },
  getBySaleAgentId: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { pageNumber, limit, status } = req.query;

      const SkipNumber = (Number(pageNumber) - 1) * Number(limit);

      const filter = status
        ? {
            $and: [
              {
                status: status,
              },
              {
                salesAgentId: req.params.saleAgentId,
              },
            ],
          }
        : { salesAgentId: req.params.saleAgentId };

      const result = await Orders.find(filter)
        .skip(SkipNumber)
        .limit(Number(limit))
        .populate("userId", ["userName", "email"])
        .populate("placeId", "name")
        .populate("salesAgentId", ["code", "userName"]);

      const allOrder = await Orders.find(filter);

      let totalPage = 0;
      if (allOrder.length % Number(limit) === 0) {
        totalPage = allOrder.length / Number(limit);
      } else {
        totalPage = Math.floor(allOrder.length / Number(limit) + 1);
      }

      res.json(
        errorFunction(false, 200, "Lấy thành công !", {
          totalPage: totalPage,
          total: allOrder.length,
          data: result,
        })
      );
    } catch (error) {
      res.status(400).json({
        error: error,
        message: "Bad request",
      });
    }
  },
  getByUserId: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { pageNumber, limit, status } = req.query;

      const SkipNumber = (Number(pageNumber) - 1) * Number(limit);

      const filter = status
        ? {
            $and: [
              {
                status: status,
              },
              {
                userId: req.params.userId,
              },
            ],
          }
        : { userId: req.params.userId };

      const result = await Orders.find(filter)
        .skip(SkipNumber)
        .limit(Number(limit))
        .populate("userId", ["userName", "email"])
        .populate("placeId", "name")
        .populate("salesAgentId", ["code", "userName"]);

      const allOrder = await Orders.find(filter);

      let totalPage = 0;
      if (allOrder.length % Number(limit) === 0) {
        totalPage = allOrder.length / Number(limit);
      } else {
        totalPage = Math.floor(allOrder.length / Number(limit) + 1);
      }

      res.json(
        errorFunction(false, 200, "Lấy thành công !", {
          totalPage: totalPage,
          total: allOrder.length,
          data: result,
        })
      );
    } catch (error) {
      res.status(400).json({
        error: error,
        message: "Bad request",
      });
    }
  },

  updateOrder: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await Orders.findById(req.params.id);

      if (!id)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      await id.updateOne({ $set: req.body });

      res.json(errorFunction(false, 200, "Cập nhật thành công !", id._id));
    } catch (error) {
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  updateStoryOrderPaymentSuccessful: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const orderId = await Orders.findById(req.params.id);

      if (!orderId)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      await orderId.updateOne({
        status: 4,
      });

      await Payments.create({
        orderId: req.params.id,
        userId: orderId.userId,
        dateTime: Number(new Date()),
      });

      res.json(errorFunction(false, 200, "Cập nhật thành công !", orderId._id));
    } catch (error) {
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  deleteOrder: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await Orders.findById(req.params.id);

      if (!id)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      await Orders.findByIdAndDelete(req.params.id);
      res.status(200).json(errorFunction(true, 200, "Xóa thành công !"));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
};

export default orderController;
