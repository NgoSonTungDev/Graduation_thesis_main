import { IUser } from "./../types/user";
import Notifications from "../models/notify";
import { errorFunction } from "../utils/errorFunction";
import { Request, Response, NextFunction } from "express";
import Users from "../models/user";

const notifyController = {
  addNotify: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Notifications.create(req.body);
      res.json(errorFunction(false, 200, "Thêm thành công", data));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  getByIdNotify: async (req: Request, res: Response) => {
    try {
      const user = await Users.findById<IUser>(req.params.id);

      if (!user)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      await Notifications.updateMany(
        { userId: req.params.id },
        {
          status: false,
        }
      );

      const data = await Notifications.find({ userId: req.params.id }).sort({
        dateTime: -1,
      });

      res.json(errorFunction(false, 200, "Lấy thành công !", data));
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteNotify: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await Notifications.findById(req.params.id);

      if (!id)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      await Notifications.findByIdAndDelete(req.params.id);
      res.status(200).json(errorFunction(true, 200, "Xóa thành công !"));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
};

export default notifyController;
