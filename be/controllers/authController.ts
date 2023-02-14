import { Request, Response, NextFunction } from "express";
import Users from "../models/user";
import { errorFunction } from "../utils/errorFunction";
import bcrypt from "bcrypt";

const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const data = await Users.create({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
      });
      const { userName, email, avt, isAdmin } = data;

      res.json(
        errorFunction(false, 200, "Tạo tài khoảng thành công !", {
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
      const user = await Users.findOne({ userName: req.body.userName });

      if (!user) {
        res.json(errorFunction(false, 404, "Sai tên đăng nhập !"));
      }
      const password = bcrypt.compare(req.body.password, user?.password + "");

      if (!password) {
        res.json(errorFunction(false, 200, "Sai mật khẩu"));
      }
      if (user && password + "") {
        const { userName, email, avt, isAdmin } = user;

        res.json(
          errorFunction(false, 200, "Đăng nhập thành công !", {
            userName,
            email,
            avt,
            isAdmin,
          })
        );
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
