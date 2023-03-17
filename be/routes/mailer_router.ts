import { Router } from "express";
import mailerController from "../controllers/mailer_controller";

export const mailerRouter = (router: Router) => {
  router.post(
    "/email/send-code-register",
    mailerController.sendCodeOtpRegister
  );

  router.post(
    "/email/send-code-register-sales-agent",
    mailerController.sendCodeOtpRegisterSalesAgent
  );

  router.post("/email/send-code", mailerController.sendCodeOtp);
};
