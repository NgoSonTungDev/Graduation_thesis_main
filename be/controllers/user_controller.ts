import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import Users from "../models/user";
import Favourites from "../models/favourite";
import Notifications from "../models/notify";
import Rooms from "../models/roomInbox";
import Posts from "../models/post";
import Comments from "../models/comment";
import RepComments from "../models/repComment";
import Tickets from "../models/ticket";
import { IUser } from "../types/user";
import { errorFunction } from "../utils/errorFunction";

const fakeCode = (length: number) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

const userController = {
  getAnUser: async (req: Request, res: Response) => {
    try {
      const user = await Users.findById<IUser>(req.params.id);

      if (!user)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      res.json(errorFunction(false, 200, "Lấy thành công !", user));
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllUser: async (req: Request, res: Response) => {
    try {
      const { pageNumber, userName, limit, isAdmin, isLock } = req.query;

      const SkipNumber = (Number(pageNumber) - 1) * Number(limit);

      let query: any = {};

      if (userName) {
        query.userName = {
          $regex: userName,
          $options: "$i",
        };
      }

      if (isAdmin) {
        query.isAdmin = isAdmin;
      }

      if (isLock) {
        query.isLock = isLock;
      }

      const allUser = await Users.find(query);

      const result = await Users.find(query)
        .skip(SkipNumber)
        .limit(Number(limit));

      let totalPage = 0;

      if (allUser.length) {
        totalPage = Math.ceil(allUser.length / Number(limit));
      }

      res.json(
        errorFunction(false, 200, "Lấy thành công !", {
          totalPage: totalPage,
          total: allUser.length,
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
  lockUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = await Users.findById(req.params.id);
      const hashedPassword = await bcrypt.hash(fakeCode(8), 10);

      if (!userId)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      await userId.updateOne({ password: hashedPassword, isLock: true });

      res.json(errorFunction(false, 200, "Đã khoá tài khoản !"));
    } catch (error) {
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  unLockUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = await Users.findById(req.params.id);
      const hashedPassword = await bcrypt.hash(req.body.fakeCode, 10);

      if (!userId)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      await userId.updateOne({ password: hashedPassword, isLock: false });

      res.json(errorFunction(false, 200, "Đã mở khoá tài khoản !"));
    } catch (error) {
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = await Users.findById(req.params.id);

      if (!userId)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      await userId.updateOne({ $set: req.body });

      res.json(errorFunction(false, 200, "Cập nhật thành công !"));
    } catch (error) {
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  updatePassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await Users.findById(req.params.id);

      if (!id)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await id.updateOne({
        $set: {
          password: hashedPassword,
        },
      });

      res.json(errorFunction(true, 200, "Cập nhật mật khẩu thành công !"));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  changePassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await Users.findById(req.params.id);

      if (!id)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await id.updateOne({
        $set: {
          password: hashedPassword,
        },
      });
      res.json(errorFunction(true, 200, "Cập nhật mật khẩu thành công !"));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await Users.findById<IUser>(req.params.id);

      if (!id)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      const roomId = await Rooms.findOne({ userId: req.params.id });

      await Favourites.deleteMany({ userId: req.params.id });
      await Notifications.deleteMany({ userId: req.params.id });
      await Rooms.findByIdAndUpdate(roomId?._id, {
        listInbox: [],
        public: false,
      });
      await Posts.deleteMany({ userId: req.params.id });
      await Comments.deleteMany({ userId: req.params.id });
      await RepComments.deleteMany({ userId: req.params.id });
      if (id.isAdmin === 2) {
        await Tickets.deleteMany({ salesAgentId: req.params.id });
      }
      // await Users.findByIdAndDelete(req.params.id);

      res.status(200).json(errorFunction(true, 200, "Xóa thành công !"));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
};

export default userController;
