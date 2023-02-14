import Purposes from "../models/purpose";
import { errorFunction } from "../utils/errorFunction";
import { Request, Response, NextFunction } from "express";

const purposeController = {
  addPurpose: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Purposes.create(req.body);
      res.json(errorFunction(false, 200, "Thêm thành công !", data));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        error: error,
        message: "Bad request",
      });
    }
  },
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Purposes.find();
      res.json(errorFunction(false, 200, "Lấy thành công !", data));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        error: error,
        message: "Bad request",
      });
    }
  },

  deletePurpose: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await Purposes.findById(req.params.id);

      if (!id)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      await Purposes.findByIdAndDelete(req.params.id);
      res.status(200).json(errorFunction(true, 200, "Xóa thành công !"));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        error: error,
        message: "Bad request",
      });
    }
  },
};

export default purposeController;
