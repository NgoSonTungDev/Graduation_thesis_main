import { Router } from "express";
import authController from "../controllers/authController";
import { verifyAdminToken, verifyTokenAuth } from "../middleware/auth";

export const authRoute = (router: Router) => {
  router.post("/user/create", authController.createUser);

  router.get("/user/all", verifyTokenAuth, authController.getAll);

  router.get("/user/an", verifyTokenAuth, authController.getMe);

  router.post("/user/login", authController.login);

  router.post("/user/refresh", authController.refreshToken);

  router.get(
    "/user/decentralization",
    verifyAdminToken,
    authController.decentralization
  );

  router.delete("/user/delete/:id", authController.delete);
};
