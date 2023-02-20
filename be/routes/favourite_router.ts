import { Router } from "express";
import favouritesController from "../controllers/favourite_controller";

export const favouriteRouter = (router: Router) => {
  router.post("/favourite/add", favouritesController.addFavourites);

  router.get(
    "/favourite/get-by-id/:id",
    favouritesController.getByIdFavourites
  );

  router.delete("/favourite/delete/:id", favouritesController.deleteFavourites);
};
