import { Request, Response, NextFunction } from "express";
import Users from "../models/user";
import { errorFunction } from "../utils/errorFunction";
import bcrypt from "bcrypt";
import Rooms from "../models/roomInbox";

const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const data = await Users.create({
        ...req.body,
        password: hashedPassword,
      });
      const { _id, userName, email, avt, isAdmin } = data;
      await Rooms.create({
        userId: _id,
        listInbox: [],
      });

      res.json(
        errorFunction(false, 200, "Tạo tài khoảng thành công !", {
          _id,
          userName,
          email,
          avt,
          isAdmin,
        })
      );
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await Users.findOne({ email: req.body.email });

      if (!user) {
        res.status(404).json(errorFunction(false, 404, "Sai tên đăng nhập !"));
      } else {
        if (user.isLock === true) {
          return res
            .status(404)
            .json(errorFunction(false, 404, "Tài khoản của bạn đã bị khoá !"));
        }

        const password = await bcrypt.compare(req.body.password, user.password);

        if (!password) {
          res.status(404).json(errorFunction(false, 404, "Sai mật khẩu !"));
        } else {
          const { _id, userName, email, avt, isAdmin } = user;
          const roomId = await Rooms.findOne({ userId: _id });
          res.json(
            errorFunction(false, 200, "Đăng nhập thành công !", {
              _id,
              userName,
              email,
              avt,
              isAdmin,
              roomId: roomId?._id,
            })
          );
        }
      }
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        error: error,
        message: "Bad request",
      });
    }
  },
};

export default authController;
