import Evaluates from "../models/evaluate";
import Places from "../models/place";
import { errorFunction } from "../utils/errorFunction";
import { Request, Response, NextFunction } from "express";

const updateRatingById = async (e: string, rating: number) => {
  await Places.findByIdAndUpdate(e, {
    rating: rating,
  });
};

const evaluateController = {
  addEvaluate: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const group = await Evaluates.aggregate([
        {
          $group: {
            _id: "$placeId",
            avgRating: { $avg: "$rating" },
          },
        },
      ]);

      await Promise.all(group.map((e) => updateRatingById(e._id, e.avgRating)));

      await Promise.all(
        group.map((item) => {
          Places.findByIdAndUpdate(
            { _id: item._id },
            {
              rating: item.avgRating,
            }
          );
        })
      );

      const data = await Evaluates.create(req.body);
      res.json(errorFunction(false, 200, "Thêm thành công", data));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  getByIdEvaluate: async (req: Request, res: Response) => {
    try {
      const data = await Evaluates.find({ placeId: req.params.id })
        .populate("userId", "userName")
        .populate("userId", "avt");
      res.json(errorFunction(false, 200, "Lấy thành công !", data));
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Evaluates.find()
        .populate("userId", "userName")
        .populate("userId", "avt");
      res.json(errorFunction(false, 200, "Lấy thành công !", data));
    } catch (error) {
      res.status(400).json({
        error: error,
        message: "Bad request",
      });
    }
  },
  deleteEvaluate: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await Evaluates.findById(req.params.id);

      if (!id)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      await Evaluates.findByIdAndDelete(req.params.id);
      res.status(200).json(errorFunction(true, 200, "Xóa thành công !"));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
};

export default evaluateController;
