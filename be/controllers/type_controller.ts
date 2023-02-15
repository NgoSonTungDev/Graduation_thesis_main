import Types from "../models/type";
import { errorFunction } from "../utils/errorFunction";
import { Request, Response, NextFunction } from "express";

const typeController = {
  addType: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const check = await Types.findOne({ name: req.body.name });

      if (check) {
        return res.status(400).json(errorFunction(true, 400, "Đã tồn tại !"));
      }

      const data = await Types.create(req.body);
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
      const data = await Types.find();
      res.json(errorFunction(false, 200, "Lấy thành công", data));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },

  deleteType: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await Types.findById(req.params.id);

      if (!id)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      await Types.findByIdAndDelete(req.params.id);
      res.status(200).json(errorFunction(true, 200, "Xóa thành công !"));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
};

export default typeController;
