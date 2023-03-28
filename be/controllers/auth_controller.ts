import { Request, Response, NextFunction } from "express";
import Users from "../models/user";
import { errorFunction } from "../utils/errorFunction";
import bcrypt from "bcrypt";
import Rooms from "../models/roomInbox";
import SalesAgents from "../models/salesAgent";

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

const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // const user: IUser = {
      //   userName: req.body.userName,
      //   email: req.body.email,
      //   password: hashedPassword,
      //   isAdmin: false,
      //   address: "",
      //   avt: "",
      //   description: "",
      //   gender: "men",
      //   numberPhone: "",
      // };
      // const data = await new AuthStore().createUser(user);

      const data = await Users.create({
        ...req.body,
        // userName: req.body.userName,
        // email: req.body.email,
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
  registerSalesAgent: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const data = await SalesAgents.create({
        ...req.body,
        code: fakeCode(8),
        password: hashedPassword,
      });

      const { _id, userName, email, code } = data;

      await Rooms.create({
        userId: _id,
        listInbox: [],
      });

      res.json(
        errorFunction(false, 200, "Tạo tài khoảng thành công !", {
          _id,
          userName,
          email,
          code,
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
      const user = await Users.findOne({ userName: req.body.userName });

      if (!user) {
        res.status(404).json(errorFunction(false, 404, "Sai tên đăng nhập !"));
      } else {
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

  loginSalesAgent: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await SalesAgents.findOne({ userName: req.body.userName });

      if (!user) {
        res.status(404).json(errorFunction(false, 404, "Sai tên đăng nhập !"));
      } else {
        const password = await bcrypt.compare(req.body.password, user.password);

        if (!password) {
          res.status(404).json(errorFunction(false, 404, "Sai mật khẩu !"));
        } else {
          const { _id, userName, email, avt } = user;

          const roomId = await Rooms.findOne({ userId: _id });

          res.json(
            errorFunction(false, 200, "Đăng nhập thành công !", {
              _id,
              userName,
              email,
              avt,
              isAdmin: 2,
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
