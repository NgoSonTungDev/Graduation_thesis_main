import { errorFunction } from "../utils/errorFunction";
import { Request, Response, NextFunction } from "express";
import Comments from "../models/comment";
import RepComments from "../models/repComment";

const repCommentController = {
  addRepComment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idComment = await Comments.findById(req.body.commentId);

      if (idComment) {
        const data = await (
          await RepComments.create(req.body)
        ).populate("userId", ["userName", "avt"]);

        return res.json(errorFunction(false, 200, "Thêm thành công", data));
      } else {
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));
      }
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  getByIdComment: async (req: Request, res: Response) => {
    try {
      const data = await RepComments.find({
        commentId: req.params.id,
      }).populate("userId", ["userName", "avt"]);
      res.json(errorFunction(false, 200, "Lấy thành công !", data));
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteRepComment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await RepComments.findById(req.params.id);

      if (!id)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      await RepComments.findByIdAndDelete(req.params.id);
      res.status(200).json(errorFunction(true, 200, "Xóa thành công !"));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
};

export default repCommentController;
