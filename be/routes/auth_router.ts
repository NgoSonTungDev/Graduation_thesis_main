import { Router } from "express";
import authController from "../controllers/auth_controller";
import { userValidation } from "../helpers/user";
import { verifyToken } from "../middleware/checkCodeOtp";

export const authRouter = (router: Router) => {
  router.post(
    "/user/register",
    verifyToken,
    userValidation,
    authController.register
  );


  router.post("/user/login", authController.login);

};
