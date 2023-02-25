import { Router } from "express";
import autoRepController from "../controllers/autoRep_controller";

export const autoRepRouter = (router: Router) => {
  router.post("/auto-rep/add", autoRepController.addRep);

  router.get("/auto-rep/get-all", autoRepController.getAll);

  router.post("/auto-rep/get-an", autoRepController.getAn);

  router.put("/auto-rep/update-by-id/:id", autoRepController.updateRep);

  router.delete("/auto-rep/delete/:id", autoRepController.deleteRep);
};
