import { Router } from "express";
import roomController from "../controllers/room_controller";

export const roomRouter = (router: Router) => {
  router.post("/room/add-inbox", roomController.addInboxRoom);

  router.get("/room/get-all", roomController.getAll);

  router.get("/room/get-room-user/:id", roomController.getByIdRoom);

  router.delete("/room/delete/:id", roomController.deleteRoom);
};
