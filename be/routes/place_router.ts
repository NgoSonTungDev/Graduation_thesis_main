import { Router } from "express";
import placeController from "../controllers/place_controller";
import { placeValidation } from "../helpers/place";

export const placeRoute = (router: Router) => {
  router.post("/place/add", placeValidation, placeController.addPlace);

  router.get("/place/all", placeController.getAll);

  router.get("/place/an/:id", placeController.getAnPlace);

  router.put("/place/update/:id", placeController.updatePlace);

  router.delete("/place/delete/:id", placeController.deletePlace);
};
