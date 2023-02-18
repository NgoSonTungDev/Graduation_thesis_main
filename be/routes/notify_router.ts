import { Router } from "express";
import notifyController from "../controllers/notify_controller";

export const notifyRoute = (router: Router) => {
  router.post("/notify/add", notifyController.addNotify);

  router.get("/notify/get-by-id/:id", notifyController.getByIdNotify);

  router.delete("/notify/delete/:id", notifyController.deleteNotify);
};
