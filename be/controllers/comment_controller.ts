import { errorFunction } from "../utils/errorFunction";
import { Request, Response, NextFunction } from "express";
import Comments from "../models/comment";

const commentController = {
  addComment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Comments.create(req.body);
      res.json(errorFunction(false, 200, "Thêm thành công", data));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  getByIdCommentPost: async (req: Request, res: Response) => {
    try {
      const data = await Comments.find({ postId: req.params.id }).populate(
        "userId",
        ["userName", "avt"]
      );
      res.json(errorFunction(false, 200, "Lấy thành công !", data));
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteComment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await Comments.findById(req.params.id);

      if (!id)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      await Comments.findByIdAndDelete(req.params.id);
      res.status(200).json(errorFunction(true, 200, "Xóa thành công !"));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
};

export default commentController;
