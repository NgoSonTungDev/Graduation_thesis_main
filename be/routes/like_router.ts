import { Router } from "express";
import likeController from "../controllers/like_controller";

export const likeRouter = (router: Router) => {
  router.post("/like-post/:id", likeController.likePost);

  router.post("/like-comment/:id", likeController.likeComment);

  router.post("/like-rep-comment/:id", likeController.likeComment);
};
