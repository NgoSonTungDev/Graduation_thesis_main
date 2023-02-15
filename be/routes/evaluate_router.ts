import { Router } from "express";
import evaluateController from "../controllers/evaluate_controller";
import { evaluateValidation } from "../helpers/evaluate";

export const evaluateRoute = (router: Router) => {
  router.post(
    "/evaluate/add",
    evaluateValidation,
    evaluateController.addEvaluate
  );
  router.get("/evaluate/get-all", evaluateController.getAll);

  router.get("/evaluate/get-by-id/:id", evaluateController.getByIdEvaluate);

  router.delete("/evaluate/delete/:id", evaluateController.deleteEvaluate);
};
