import { Router } from "express";
import repCommentController from "../controllers/repComment_controller";
import { repCommentValidation } from "../helpers/repComment";

export const repCommentRouter = (router: Router) => {
  router.post(
    "/rep-comment/add",
    repCommentValidation,
    repCommentController.addRepComment
  );

  router.get("/rep-comment/get-by-id/:id", repCommentController.getByIdComment);

  router.delete(
    "/rep-comment/delete/:id",
    repCommentController.deleteRepComment
  );
};
