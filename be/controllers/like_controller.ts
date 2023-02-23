import { errorFunction } from "../utils/errorFunction";
import { Request, Response, NextFunction } from "express";
import Comments from "../models/comment";
import Posts from "../models/post";
import RepComments from "../models/repComment";

const likeController = {
  likePost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await Posts.findById(req.params.id);

      if (!id)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      await id.updateOne({ $push: { like: req.body.userId } });

      res.json(errorFunction(true, 200, "Đã like bài viết ."));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  likeComment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await Comments.findById(req.params.id);

      if (!id)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      await id.updateOne({ $push: { like: req.body.userId } });

      res.json(errorFunction(true, 200, "Đã like bình luận ."));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  likeRepComment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await RepComments.findById(req.params.id);

      if (!id)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      await id.updateOne({ $push: { like: req.body.userId } });

      res.json(errorFunction(true, 200, "Đã like bình luận ."));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
};

export default likeController;