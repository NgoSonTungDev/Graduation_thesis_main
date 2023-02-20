import { orderValidation } from "./../helpers/order";
import { Router } from "express";
import orderController from "../controllers/order_controller";

export const orderRouter = (router: Router) => {
  router.post("/order/add", orderValidation, orderController.addOrder);

  router.get("/order/all", orderController.getAll);

  router.put("/order/update/:id", orderController.updateOrder);

  router.delete("/order/delete/:id", orderController.deleteOrder);
};
