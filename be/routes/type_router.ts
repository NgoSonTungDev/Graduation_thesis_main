import { Router } from "express";
import typeController from "../controllers/type_controller";
import { purposeTypeValidation } from "../helpers/purpose_type";

export const typeRoute = (router: Router) => {
  router.post("/type/create", purposeTypeValidation, typeController.addType);

  router.get("/type/all", typeController.getAll);

  router.delete("/type/delete/:id", typeController.deleteType);
};
