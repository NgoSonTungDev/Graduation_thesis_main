import { Router } from "express";
import vnPayController from "../controllers/vnpay";

export const evaluateRoute = (router: Router) => {
  router.post("/vnPay/create-url", vnPayController.paymentOrder);
};
