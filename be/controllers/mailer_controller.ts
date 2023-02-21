import nodemailer from "nodemailer";
import { Request, Response, NextFunction } from "express";
import { errorFunction } from "../utils/errorFunction";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Users from "../models/user";
import { IUser } from "../types/user";

var min = 100000;
var max = 999999;
const date = Number(new Date());
dotenv.config();

const uiSendEmail = (code: number) => {
  return `    <div
   class="container"
   style="
     position: absolute;
     width: 600px;
     height: 400px;
     top: 50%;
     left: 50%;
     border-radius: 5px;
     background: url(https://demoda.vn/wp-content/uploads/2022/03/background-black-background-den-cac-khoi-3d.jpg);
     background-position: center;
     background-size: cover;
     background-repeat: no-repeat;
     border: 1px solid #3e3e3e;
     transform: translate(-50%, -50%);
     box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
       rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
   "
  >
   <div class="container_icon" style="text-align: center; margin-top: 40px">
     <p
       style="
         text-transform: uppercase;
         margin-top: 10px;
         font-size: 25px;
         font-weight: 700;
         color: #2ecc71;
       "
     >
       Mã Xác Nhận Của Bạn
     </p>
     <b style="font-size: 40px; color: #fff; ">${code}</b>
   </div>
   <div
     class="container_text"
     style="
       margin-top: 20px;
       width: 90%;
       margin-left: 5%;
       text-align: center;
       font-size: 18px;
       color: #dfe6e9;
     "
   >
     <span>
       Đây mà đoạn mã được gửi từ hệ thống <b>MAFLINE</b> dùng để xác thực
       email hoặc tài khoản của bạn ! vì lí do bảo mật vui lòng không chia sẻ
       mã này dưới bất kì hình thức nào. <b>MAFLINE</b> cảm ơn bạn đã sử dụng
       dịch vụ của chung tôi 😉
     </span>
   </div>
  </div>`;
};

const generateToken = (code: number) => {
  const token = jwt.sign({ code }, process.env.TOKEN_SECRET + "", {
    expiresIn: "180s",
  });

  return token;
};

const mailerController = {
  sendCodeOtpRegister: async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      const check = Math.floor(min + Math.random() * (max - min));

      if (!req.body.email || !req.body.userName) {
        return res
          .status(403)
          .json(errorFunction(true, 403, "Truyền thiếu username hoặc email"));
      }

      const checkUserName = await Users.findOne<IUser>({
        userName: req.body.userName,
      });
      // const checkExist = await Users.findOne<IUser>({$or: [
      //   {userName: req.body.userName}, { email: req.body.email }
      // ]})
      const checkEmail = await Users.findOne({ email: req.body.email });

      if (checkUserName)
        return res
          .status(400)
          .json(errorFunction(true, 400, "Tên này đã tồn tại !"));

      if (checkEmail)
        return res
          .status(400)
          .json(errorFunction(true, 400, "Email này đã tồn tại !"));

      const msg = {
        from: process.env.USERMAIL,
        to: `${email}`,
        subject: "THÔNG BÁO TỪ HỆ THỐNG MAFLINE",
        html: uiSendEmail(check),
      };
      nodemailer
        .createTransport({
          service: "gmail",
          auth: {
            user: process.env.USERMAIL,
            pass: process.env.PASSMAIL,
          },
          port: 465,
          host: "smtp.gmail.com",
        })
        .sendMail(msg, async (err) => {
          if (err) {
            console.log(err);
            return res.status(500).json(err);
          } else {
            const token = generateToken(check);

            res.cookie("CodeRegister", `${token}`, {
              // maxAge: 5000,
              expires: new Date(Date.now() + 180 * 1000),
              httpOnly: true,
            });
            res.json(
              errorFunction(
                false,
                200,
                `Email sent ${email} with code : ${check} and Token : ${token}`,
                token
              )
            );
          }
        });
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  sendCodeOtp: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;

      const check = Math.floor(min + Math.random() * (max - min));

      if (req.body.email === "") {
        return res
          .status(403)
          .json(errorFunction(true, 403, "Không nhận được email !"));
      }

      const msg = {
        from: process.env.USERMAIL,
        to: `${email}`,
        subject: "THÔNG BÁO TỪ HỆ THỐNG MAFLINE",
        html: uiSendEmail(check),
      };
      nodemailer
        .createTransport({
          service: "gmail",
          auth: {
            user: process.env.USERMAIL,
            pass: process.env.PASSMAIL,
          },
          port: 465,
          host: "smtp.gmail.com",
        })
        .sendMail(msg, (err) => {
          if (err) {
            console.log(err);
            return res.status(500).json(err);
          } else {
            const token = generateToken(check);

            // res.cookie("CodeRegister", `${token}`, {
            //   expires: new Date(Date.now() + 180 * 1000),
            // });
            res.json(
              errorFunction(
                true,
                200,
                `Email sent ${email} with code : ${check} and Token : ${token}`
              )
            );
          }
        });
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
};

export default mailerController;
