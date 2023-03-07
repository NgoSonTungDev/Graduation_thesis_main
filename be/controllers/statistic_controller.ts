import Types from "../models/type";
import { errorFunction } from "../utils/errorFunction";
import { Request, Response, NextFunction } from "express";
import Users from "../models/user";
import Evaluates from "../models/evaluate";
import Places from "../models/place";
import Payments from "../models/payment";
import moment from "moment";

const sumTotal = (x: number, y: number) => {
  return x + y;
};

const statisticController = {
  generalStatistics: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const account = await Users.count();

      const groupEvaluate = await Evaluates.aggregate([
        {
          $group: {
            _id: "$placeId",
            evaluate: {
              $sum: 1,
            },
          },
        },
        {
          $addFields: {
            placeId: {
              $toObjectId: "$_id",
            },
          },
        },
        {
          $lookup: {
            from: "places",
            localField: "placeId",
            foreignField: "_id",
            as: "places",
          },
        },
        {
          $unwind: "$places",
        },
        {
          $project: {
            _id: 1,
            evaluate: 1,
            places: { _id: 1, name: 1, location: 1, image: 1 },
          },
        },
      ]);

      const groupPlaceLocation = await Places.aggregate([
        {
          $group: {
            _id: "$location",
            sum: { $sum: 1 },
          },
        },
      ]);

      res.json(
        errorFunction(false, 200, "Lấy thống kê thành công", {
          account: account,
          evaluate: groupEvaluate,
          place: groupPlaceLocation,
        })
      );
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },

  detailPaymentStatisticsForAbout: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { startDay, endDay } = req.query;
      let sum = 0;

      // console.log(moment(Number(startDay)).format("YYYY-MM-DD"), endDay);

      const result = await Payments.aggregate([
        {
          $addFields: {
            timeFormat: {
              $toDate: "$dateTime",
            },
          },
        },
        {
          $match: {
            timeFormat: {
              $gte: new Date(Number(startDay)),
              $lt: new Date(Number(endDay)),
            },
          },
        },
        {
          $lookup: {
            from: "orders",
            localField: "orderId",
            foreignField: "_id",
            as: "detail",
          },
        },
        {
          $unwind: "$detail",
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$timeFormat",
              },
            },
            sumTicked: {
              $sum: "$detail.amount",
            },
            totalRevenue: {
              $sum: "$detail.total",
            },
          },
        },
      ]);

      const arrNumber = result.map((e) => e.totalRevenue);

      res.json(
        errorFunction(false, 200, "Lấy thống kê thành công", {
          detail: result,
          total: arrNumber.reduce(sumTotal, sum),
        })
      );
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },

  detailPaymentStatisticsForDay: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { dayTime } = req.query;
      let sum = 0;

      console.log(dayTime, moment(Number(dayTime)).format("YYYY-MM-DD"));

      const result = await Payments.aggregate([
        {
          $project: {
            orderId: 1,
            dateTime: {
              $toDate: "$dateTime",
            },
          },
        },
        {
          $addFields: {
            formatDateTime: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$dateTime",
              },
            },
          },
        },
        {
          $match: {
            formatDateTime: {
              $eq: moment(Number(dayTime)).format("YYYY-MM-DD"),
            },
          },
        },
        {
          $lookup: {
            from: "orders",
            localField: "orderId",
            foreignField: "_id",
            as: "detail",
          },
        },
        {
          $unwind: "$detail",
        },
        {
          $project: {
            dateTime: 1,
            detail: {
              codeOrder: 1,
              amount: 1,
              total: 1,
            },
          },
        },
      ]);

      const arrNumber = result.map((e) => e.detail?.total);

      res.json(
        errorFunction(false, 200, "Lấy thống kê thành công", {
          detail: result,
          total: arrNumber.reduce(sumTotal, sum),
        })
      );
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
};

export default statisticController;
