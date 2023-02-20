import { Router } from "express";
import purposeController from "../controllers/purpose_controller";
import { purposeTypeValidation } from "../helpers/purpose_type";

export const purposeRouter = (router: Router) => {
  router.post(
    "/purpose/create",
    purposeTypeValidation,
    purposeController.addPurpose
  );

  router.get("/purpose/all", purposeController.getAll);

  router.delete("/purpose/delete/:id", purposeController.deletePurpose);
};
