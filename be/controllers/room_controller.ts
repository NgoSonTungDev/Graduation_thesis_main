import { NextFunction, Request, Response } from "express";
import Rooms from "../models/roomInbox";
import { errorFunction } from "../utils/errorFunction";

const roomController = {
  addInboxRoom: async (req: Request, res: Response) => {
    try {
      const roomId = Rooms.findById(req.body.roomId);

      if (!roomId)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      await roomId.updateOne({
        $push: { listInbox: req.body.message },
        public: true,
      });

      res.json(errorFunction(true, 200, "Thêm thành công !"));
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      try {
        const { userName } = req.query;

        const condition = userName
          ? { userName: { $regex: new RegExp(userName + ""), $options: "i" } }
          : {};

        const result = await Rooms.find(condition).populate("userId", [
          "userName",
          "avt",
        ]);

        res.json(errorFunction(false, 200, "Lấy thành công !", result));
      } catch (error) {
        res.status(400).json({
          error: error,
          message: "Bad request",
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: "Bad request",
      });
    }
  },

  getByIdRoom: async (req: Request, res: Response) => {
    try {
      const data = await Rooms.findOne({ userId: req.params.id }).populate(
        "userId",
        ["userName", "email", "avt", "gender"]
      );

      res.json(errorFunction(false, 200, "Lấy thành công !", data));
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteRoom: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await Rooms.findById(req.params.id);

      if (!id)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      await Rooms.findByIdAndDelete(req.params.id);
      res.status(200).json(errorFunction(true, 200, "Xóa thành công !"));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
};

export default roomController;
