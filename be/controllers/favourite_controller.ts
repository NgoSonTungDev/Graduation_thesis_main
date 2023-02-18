import { errorFunction } from "../utils/errorFunction";
import { Request, Response, NextFunction } from "express";
import Favourites from "../models/favourite";

const favouritesController = {
  addFavourites: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const check = await Favourites.find({ userId: req.body.userId });

      if (
        check.findIndex((e) => {
          return e.placeId === req.body.placeId;
        })
      ) {
        res
          .status(403)
          .json(errorFunction(true, 403, "Đã có trong danh sách ưa thích !"));
      } else {
        const data = await Favourites.create(req.body);
        res.json(errorFunction(false, 200, "Thêm thành công", data));
      }
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  getByIdFavourites: async (req: Request, res: Response) => {
    try {
      const data = await Favourites.find({ userId: req.params.id }).populate(
        "placeId"
      );

      res.json(errorFunction(false, 200, "Lấy thành công !", data));
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteFavourites: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await Favourites.findById(req.params.id);

      if (!id)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      await Favourites.findByIdAndDelete(req.params.id);
      res.status(200).json(errorFunction(true, 200, "Xóa thành công !"));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
};

export default favouritesController;
