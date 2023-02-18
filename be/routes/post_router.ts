import { Router } from "express";
import postController from "../controllers/post_controller";
import { postValidation } from "../helpers/post";

export const postRoute = (router: Router) => {
  router.post("/post/add", postValidation, postController.addPost);

  router.get("/post/all", postController.getAll);

  router.put("/post/update-status/:id", postController.updatePublicPost);

  router.delete("/post/delete/:id", postController.deletePost);
};
