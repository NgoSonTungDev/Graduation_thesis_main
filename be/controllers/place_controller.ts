import Places from "../models/place";
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
        placeName,
        limit,
        type,
        purpose,
        location,
        variability,
      } = req.query;

      const SkipNumber = (Number(pageNumber) - 1) * Number(limit);

      const filter = {
        $and: [
          {
            name: {
              $regex: placeName,
              $options: "$i",
            },
          },
          {
            location: {
              $regex: location,
              $options: "$i",
            },
          },
          {
            purpose: {
              $regex: purpose,
              $options: "$i",
            },
          },
          {
            type: {
              $regex: type,
              $options: "$i",
            },
          },
        ],
      };

      const result = await Places.find(filter)
        .sort(`${variability === "asc" ? "" : "-"}price`)
        .skip(SkipNumber)
        .limit(Number(limit));

      // const abc = await Places.aggregate([
      //   {
      //     $group: {
      //       _id: "$created"
      //       total: {$sum: 1}
      //     }
      //   }
      // ])

      const allPlace = await Places.find(filter);

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
