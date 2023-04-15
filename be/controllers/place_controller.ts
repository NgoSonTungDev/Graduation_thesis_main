import Places from "../models/place";
import Tickets from "../models/ticket";
import Posts from "../models/post";
import Vouchers from "../models/voucher";
import { errorFunction } from "../utils/errorFunction";
import { Request, Response, NextFunction } from "express";

const placeController = {
  addPlace: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const check = await Places.findOne({ name: req.body.name });

      if (check) {
        return res.status(400).json(errorFunction(true, 400, "Đã tồn tại !"));
      }

      const data = await Places.create(req.body);
      res.json(errorFunction(false, 200, "Thêm thành công", data));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  getAnPlace: async (req: Request, res: Response) => {
    try {
      const id = await Places.findById(req.params.id);

      if (!id)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      const data = await Places.findById(req.params.id);
      res.json(errorFunction(false, 200, "Lấy thành công !", data));
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        pageNumber,
        limit,
        placeName,
        type,
        purpose,
        location,
        variability,
      } = req.query;

      const SkipNumber = (Number(pageNumber) - 1) * Number(limit);

      let query: any = {};

      if (!pageNumber || !limit) {
        return res
          .status(400)
          .json(errorFunction(true, 400, "Truyền thiếu page và limit"));
      }

      if (placeName) {
        query.name = {
          $regex: placeName,
          $options: "i",
        };
      }
      if (location) {
        query.location = location;
      }
      if (purpose) {
        query.purpose = purpose;
      }
      if (type) {
        query.type = type;
      }

      console.log(query);

      const result = await Places.find(query)
        .sort(`${variability === "asc" ? "" : "-"}rating`)
        .skip(SkipNumber)
        .limit(Number(limit));

      const allPlace = await Places.find(query);

      let totalPage = 0;
      if (allPlace.length % Number(limit) === 0) {
        totalPage = allPlace.length / Number(limit);
      } else {
        totalPage = Math.floor(allPlace.length / Number(limit) + 1);
      }

      res.json(
        errorFunction(false, 200, "Lấy thành công !", {
          totalPage: totalPage,
          total: allPlace.length,
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
  updatePlace: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const placeId = await Places.findById(req.params.id);

      if (!placeId)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      await placeId.updateOne({ $set: req.body });

      res.json(errorFunction(true, 200, "Cập nhật thành công !"));
    } catch (error) {
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  deletePlace: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await Places.findById(req.params.id);

      if (!id)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      await Vouchers.deleteMany({ placeId: req.params.id });
      await Tickets.deleteMany({ placeId: req.params.id });
      await Posts.deleteMany({ placeId: req.params.id });
      await Places.findByIdAndDelete(req.params.id);
      res.status(200).json(errorFunction(true, 200, "Xóa thành công !"));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
};

export default placeController;
