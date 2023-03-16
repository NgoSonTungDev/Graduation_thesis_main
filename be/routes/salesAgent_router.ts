import { Router } from "express";
import salesAgentController from "../controllers/salesAgent_controller";
import { verifyToken } from "../middleware/checkCodeOtp";

export const salesAgentRouter = (router: Router) => {
  router.get("/sales-agent/get-all", salesAgentController.getAllSalesAgent);

  router.get("/sales-agent/get-an/:id", salesAgentController.getAnSalesAgent);

  router.put("/sales-agent/update/:id", salesAgentController.updateSalesAgent);

  router.put(
    "/sales-agent/update-password/:id",
    verifyToken,
    salesAgentController.updatePassword
  );

  router.put(
    "/sales-agent/change-password/:id",
    salesAgentController.changePassword
  );

  router.delete(
    "/sales-agent/delete/:id",
    salesAgentController.deleteSalesAgent
  );
};
