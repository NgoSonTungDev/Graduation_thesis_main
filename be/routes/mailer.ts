import { Router } from "express";
import mailerController from "../controllers/mailerController";
import { userValidation } from "../helpers/user";

export const MailerRoute = (router: Router) => {
  router.post(
    "/email/send-code-register",
    mailerController.sendCodeOtpRegister
  );
};
