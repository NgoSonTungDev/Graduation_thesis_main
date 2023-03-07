import { Router } from "express";
import likeController from "../controllers/like_controller";

export const likeRouter = (router: Router) => {
  router.post("/like-post/:id", likeController.likePost);

  router.post("/dis-like-post/:id", likeController.disLikePost);

  router.post("/like-comment/:id", likeController.likeComment);

  router.post("/dis-like-comment/:id", likeController.disLikeComment);

  router.post("/like-rep-comment/:id", likeController.likeRepComment);

  router.post("/dis-like-rep-comment/:id", likeController.disLikeRepComment);

  router.post("/favourite-place/:id", likeController.favouritePlace);

  router.post("/dis-favourite-place/:id", likeController.disFavouritePlace);
};
