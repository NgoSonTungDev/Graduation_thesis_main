import { ITicket } from "./../types/ticket";
import { IOrder } from "./../types/order";
import { errorFunction } from "../utils/errorFunction";
import { Request, Response, NextFunction } from "express";
import Orders from "../models/order";
import Payments from "../models/payment";
import Tickets from "../models/ticket";
import { ObjectId } from "mongodb";

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
      const { pageNumber, limit, status, salesAgentId, dateTime } = req.query;

      const SkipNumber = (Number(pageNumber) - 1) * Number(limit);

      let query: any = {};

      if (status) {
        query.status = status;
      }

      if (salesAgentId) {
        query.salesAgentId = new ObjectId(String(salesAgentId));
      }

      // if (!dateTime) {
      //   const result = await Orders.find(query)
      //     .sort({ createdAt: -1 })
      //     .skip(SkipNumber)
      //     .limit(Number(limit))
      //     .populate("userId", ["userName", "email", "address", "numberPhone"])
      //     .populate("placeId", "name")
      //     .populate("salesAgentId", ["userName", "email"])
      //     .populate("ticketId", [
      //       "adultTicket",
      //       "childTicket",
      //       "numberTickets",
      //     ]);

      //   const allOrder = await Orders.find(query);

      //   let totalPage = 0;
      //   if (allOrder.length % Number(limit) === 0) {
      //     totalPage = allOrder.length / Number(limit);
      //   } else {
      //     totalPage = Math.floor(allOrder.length / Number(limit) + 1);
      //   }

      //   res.json(
      //     errorFunction(false, 200, "Lấy thành công !", {
      //       totalPage: totalPage,
      //       total: allOrder.length,
      //       data: result,
      //     })
      //   );
      // } else {
      //   const result = await Orders.aggregate([
      //     {
      //       $addFields: {
      //         format: {
      //           $dateToString: {
      //             format: "%Y-%m-%d",
      //             date: "$createdAt",
      //           },
      //         },
      //       },
      //     },
      //     {
      //       $match: {
      //         $and: [
      //           {
      //             status: 1,
      //             amount: 7,
      //           },
      //           {
      //             format: {
      //               $eq: "2023-03-17",
      //             },
      //           },
      //         ],
      //       },
      //     },
      //     {
      //       $lookup: {
      //         from: "places",
      //         localField: "placeId",
      //         foreignField: "_id",
      //         as: "placeId",
      //       },
      //     },
      //     {
      //       $unwind: {
      //         path: "$placeId",
      //       },
      //     },
      //     {
      //       $lookup: {
      //         from: "users",
      //         localField: "userId",
      //         foreignField: "_id",
      //         as: "userId",
      //       },
      //     },
      //     {
      //       $unwind: {
      //         path: "$userId",
      //       },
      //     },
      //     {
      //       $lookup: {
      //         from: "users",
      //         localField: "salesAgentId",
      //         foreignField: "_id",
      //         as: "salesAgentId",
      //       },
      //     },
      //     {
      //       $unwind: {
      //         path: "$salesAgentId",
      //       },
      //     },
      //   ])

      //   // [
      //   //   {
      //   //     '$addFields': {
      //   //       'format': {
      //   //         '$dateToString': {
      //   //           'format': '%Y-%m-%d', 
      //   //           'date': '$createdAt'
      //   //         }
      //   //       }
      //   //     }
      //   //   }, {
      //   //     '$lookup': {
      //   //       'from': 'tickets', 
      //   //       'localField': 'ticketId', 
      //   //       'foreignField': '_id', 
      //   //       'as': 'ticketId'
      //   //     }
      //   //   }, {
      //   //     '$unwind': {
      //   //       'path': '$ticketId'
      //   //     }
      //   //   }, {
      //   //     '$lookup': {
      //   //       'from': 'places', 
      //   //       'localField': 'placeId', 
      //   //       'foreignField': '_id', 
      //   //       'as': 'placeId'
      //   //     }
      //   //   }, {
      //   //     '$unwind': {
      //   //       'path': '$placeId'
      //   //     }
      //   //   }, {
      //   //     '$lookup': {
      //   //       'from': 'users', 
      //   //       'localField': 'userId', 
      //   //       'foreignField': '_id', 
      //   //       'as': 'userId'
      //   //     }
      //   //   }, {
      //   //     '$unwind': {
      //   //       'path': '$userId'
      //   //     }
      //   //   }, {
      //   //     '$lookup': {
      //   //       'from': 'users', 
      //   //       'localField': 'salesAgentId', 
      //   //       'foreignField': '_id', 
      //   //       'as': 'salesAgentId'
      //   //     }
      //   //   }, {
      //   //     '$unwind': {
      //   //       'path': '$salesAgentId'
      //   //     }
      //   //   }
      //   // ]
      //     .sort({ createdAt: -1 })
      //     .skip(SkipNumber)
      //     .limit(Number(limit));
      //   // .populate("userId", ["userName", "email", "address", "numberPhone"])
      //   // .populate("placeId", "name")
      //   // .populate("salesAgentId", ["userName", "email"])
      //   // .populate("ticketId", [
      //   //   "adultTicket",
      //   //   "childTicket",
      //   //   "numberTickets",
      //   // ]);

      //   const allOrder = await Orders.find(query);

      //   let totalPage = 0;
      //   if (allOrder.length % Number(limit) === 0) {
      //     totalPage = allOrder.length / Number(limit);
      //   } else {
      //     totalPage = Math.floor(allOrder.length / Number(limit) + 1);
      //   }

      //   res.json(
      //     errorFunction(false, 200, "Lấy thành công !", {
      //       totalPage: totalPage,
      //       total: allOrder.length,
      //       data: result,
      //     })
      //   );
      // }

      const condition = status ? { status: status } : {};

      const result = await Orders.find(condition)
        .sort({ createdAt: -1 })
        .skip(SkipNumber)
        .limit(Number(limit))
        .populate("userId", ["userName", "email", "address", "numberPhone"])
        .populate("placeId", "name")
        .populate("salesAgentId", ["userName", "email"])
        .populate("ticketId", ["adultTicket", "childTicket", "numberTickets"]);

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
        .sort({ createdAt: -1 })
        .skip(SkipNumber)
        .limit(Number(limit))
        .populate("userId", ["userName", "email", "address", "numberPhone"])
        .populate("placeId", "name")
        .populate("salesAgentId", ["userName", "email"])
        .populate("ticketId", ["adultTicket", "childTicket", "numberTickets"]);

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
        .sort({ createdAt: -1 })
        .skip(SkipNumber)
        .limit(Number(limit))
        .populate("userId", ["userName", "email", "address", "numberPhone"])
        .populate("placeId", "name")
        .populate("salesAgentId", ["userName", "email"])
        .populate("ticketId", ["adultTicket", "childTicket", "numberTickets"]);

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

      const findTicket = await Tickets.findById<ITicket>(orderId.ticketId);

      await orderId.updateOne({
        status: 4,
      });

      await Tickets.findByIdAndUpdate(orderId.ticketId, {
        numberTickets: Number(findTicket?.numberTickets) - orderId.amount,
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
