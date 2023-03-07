import { Router } from "express";
import paymentController from "../controllers/payment_controller";

export const paymentRouter = (router: Router) => {
  router.post("/payment/add", paymentController.addPayment);

  router.get("/payment/get-all", paymentController.getAll);
};
