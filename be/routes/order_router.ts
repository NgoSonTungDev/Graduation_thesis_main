import { orderValidation } from "./../helpers/order";
import { Router } from "express";
import orderController from "../controllers/order_controller";

export const orderRouter = (router: Router) => {
  router.post("/order/add", orderValidation, orderController.addOrder);

  router.get("/order/all", orderController.getAll);

  router.get("/order/get-id-user/:userId", orderController.getOrderById);

  router.get(
    "/order/get-id-sale-agent/:saleAgentId",
    orderController.getBySaleAgentId
  );

  router.put("/order/update/:id", orderController.updateOrder);

  router.put(
    "/order/update-story-success/:id",
    orderController.updateStoryOrderPaymentSuccessful
  );

  router.delete("/order/delete/:id", orderController.deleteOrder);
};
