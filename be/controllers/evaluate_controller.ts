import Evaluates from "../models/evaluate";
import { errorFunction } from "../utils/errorFunction";
import { Request, Response, NextFunction } from "express";

const evaluateController = {
  addEvaluate: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Evaluates.create(req.body);
      res.json(errorFunction(false, 200, "Thêm thành công", data));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  //   getAnEvaluate: async (req: Request, res: Response) => {
  //     try {
  //       const id = await Evaluates.findById(req.params.id);

  //       if (!id)
  //         return res
  //           .status(404)
  //           .json(errorFunction(true, 404, "Không tồn tại !"));

  //       const data = await Evaluates.findById(req.params.id).populate("userId");
  //       res.json(errorFunction(false, 200, "Lấy thành công !", data));
  //     } catch (error) {
  //       res.status(500).json(error);
  //     }
  //   },
  getByIdEvaluate: async (req: Request, res: Response) => {
    try {
      const data = await Evaluates.find({ placeId: req.params.id }).populate(
        "userId",
        "userName"
      );
      res.json(errorFunction(false, 200, "Lấy thành công !", data));
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Evaluates.find().populate("userId", "userName");
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