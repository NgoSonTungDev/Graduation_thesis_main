import { NextFunction, Request, Response } from "express";
import Rooms from "../models/roomInbox";
import { errorFunction } from "../utils/errorFunction";

const roomController = {
  addInboxRoom: async (req: Request, res: Response) => {
    try {
      // const roomId = Rooms.findById(req.body.roomId);

      // if (!roomId)
      //   return res
      //     .status(404)
      //     .json(errorFunction(true, 404, "Không tồn tại !"));

      // await roomId.updateOne({
      //   $push: { listInbox: req.body.message },
      //   public: true,
      // });
      await Rooms.create(req.body)

      res.json(errorFunction(true, 200, "Thêm thành công !"));
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      try {
        const { userName, isAdmin } = req.query;

        const result = await Rooms.aggregate([
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $unwind: "$user",
          },
          {
            $match: {
              $and: [
                {
                  "user.userName": {
                    $regex: userName,
                    $options: "i",
                  },
                },
                {
                  "user.isAdmin": Number(isAdmin),
                },
                {
                  public: true,
                },
              ],
            },
          },
          {
            $project: {
              _id: 1,
              userId: 1,
              listInbox: 1,
              public: 1,
              user: {
                _id: 1,
                userName: 1,
                email: 1,
                gender: 1,
                avt: 1,
                isAdmin: 1,
              },
            },
          },
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
      const data = await Rooms.findById(req.params.id).populate("userId", [
        "userName",
        "email",
        "avt",
        "gender",
        "isAdmin",
      ]);

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
