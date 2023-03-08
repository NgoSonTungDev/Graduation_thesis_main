import { Router } from "express";
import userController from "../controllers/user_controller";
import { verifyToken } from "../middleware/checkCodeOtp";

export const userRouter = (router: Router) => {
  router.get("/user/get-all", userController.getAllUser);

  router.get("/user/get-an/:id", userController.getAnUser);

  router.put("/user/update/:id", userController.updateUser);

  router.put(
    "/user/update-password/:id",
    verifyToken,
    userController.updatePassword
  );

  router.put("/user/change-password/:id", userController.changePassword);

  router.delete("/user/delete/:id", userController.deleteUser);
};
