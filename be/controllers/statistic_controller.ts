import { errorFunction } from "../utils/errorFunction";
import { Request, Response, NextFunction } from "express";
import Users from "../models/user";
import Evaluates from "../models/evaluate";
import Places from "../models/place";
import Payments from "../models/payment";
import moment from "moment";
import { ObjectId } from "mongodb";

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

      const statisticComment = await Places.aggregate([
        {
          $project: {
            name: "$name",
            list: "$statisticCmt",
          },
        },
        {
          $unwind: "$list",
        },
        {
          $group: {
            _id: "$_id",
            falseCount: {
              $sum: {
                $cond: {
                  if: {
                    $eq: ["$list.rateComments", false],
                  },
                  then: 1,
                  else: 0,
                },
              },
            },
            trueCount: {
              $sum: {
                $cond: {
                  if: {
                    $eq: ["$list.rateComments", true],
                  },
                  then: 1,
                  else: 0,
                },
              },
            },
          },
        },
        {
          $lookup: {
            from: "places",
            localField: "_id",
            foreignField: "_id",
            as: "place",
          },
        },
        {
          $unwind: "$place",
        },
        {
          $project: {
            _id: 1,
            name: "$place.name",
            trueCount: 1,
            falseCount: 1,
          },
        },
        {
          $sort: {
            trueCount: 1,
          },
        },
      ]);

      res.json(
        errorFunction(false, 200, "Lấy thống kê thành công", {
          account: account,
          evaluate: groupEvaluate,
          place: groupPlaceLocation,
          comment: statisticComment,
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
      const startDay = Number(req.query.startDay);
      const endDay = Number(req.query.endDay);

      if (
        !startDay ||
        !endDay ||
        new Date(startDay).toString() === "Invalid Date" ||
        new Date(endDay).toString() === "Invalid Date"
      ) {
        throw Error("Ngay khong hop lệ");
      }

      let sum = 0;

      const result = await Payments.aggregate([
        {
          $match: {
            dateTime: {
              $gte: startDay,
              $lte: endDay,
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
            _id: "$dateTime",
            sumTicked: {
              $sum: "$detail.amount",
            },
            totalRevenue: {
              $sum: "$detail.total",
            },
          },
        },
        {
          $project: {
            _id: {
              $toDate: "$_id",
            },
            sumTicked: 1,
            totalRevenue: 1,
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

  statisticCommentGoodOrBad: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await Places.aggregate([
        {
          $project: {
            name: "$name",
            list: "$statisticCmt",
          },
        },
        {
          $unwind: "$list",
        },
        {
          $group: {
            _id: "$_id",
            falseCount: {
              $sum: {
                $cond: {
                  if: {
                    $eq: ["$list.rateComments", false],
                  },
                  then: 1,
                  else: 0,
                },
              },
            },
            trueCount: {
              $sum: {
                $cond: {
                  if: {
                    $eq: ["$list.rateComments", true],
                  },
                  then: 1,
                  else: 0,
                },
              },
            },
          },
        },
        {
          $lookup: {
            from: "places",
            localField: "_id",
            foreignField: "_id",
            as: "place",
          },
        },
        {
          $unwind: "$place",
        },
        {
          $project: {
            _id: 1,
            name: "$place.name",
            trueCount: 1,
            falseCount: 1,
          },
        },
        {
          $sort: {
            trueCount: -1,
          },
        },
      ]);

      res.json(errorFunction(false, 200, "Lấy thống kê thành công", result));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  detailPaymentStatisticsForAboutSaleAgent: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { startDay, endDay, salesAgentId } = req.query;
      let sum = 0;

      const result = await Payments.aggregate([
        {
          $addFields: {
            timeFormat: {
              $toDate: "$dateTime",
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
          $addFields: {
            salesAgentId: "$detail.salesAgentId",
          },
        },
        {
          $match: {
            $and: [
              {
                timeFormat: {
                  $gte: new Date(Number(startDay)),
                  $lte: new Date(Number(endDay)),
                },
              },
              {
                salesAgentId: new ObjectId(salesAgentId + ""),
              },
            ],
          },
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
};

export default statisticController;
