import { Router } from "express";
import commentController from "../controllers/comment_controller";
import { commentValidation } from "../helpers/comment";

export const commentRouter = (router: Router) => {
  router.post("/comment/add", commentValidation, commentController.addComment);

  router.get(
    "/comment/get-by-id-post/:id",
    commentController.getByIdCommentPost
  );

  router.delete("/comment/delete/:id", commentController.deleteComment);
};
