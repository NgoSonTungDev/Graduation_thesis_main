import { NextFunction, Request, Response } from "express";
import Posts from "../models/post";
import { errorFunction } from "../utils/errorFunction";
import Comments from "../models/comment";
import RepComments from "../models/repComment";
import { IPost } from "../types/post";

const postController = {
  addPost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Posts.create(req.body);
      res.json(errorFunction(false, 200, "Thêm thành công", data));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { pageNumber, placeId, active , limit} = req.query;

      const SkipNumber = (Number(pageNumber) - 1) * Number(limit);

      const condition: any = {};

      if (active) {
        condition.public = active;
      }
      if (placeId) {
        condition.placeId = placeId;
      }

      const allPost = await Posts.find(condition);

      const result = await Posts.find(condition)
        .sort({ createdAt: -1 })
        .skip(SkipNumber)
        .limit(Number(limit))
        .populate("userId", ["userName", "avt"])
        .populate("placeId", "name");

      let totalPage = 0;

      if (allPost.length % Number(limit) === 0) {
        totalPage = allPost.length / Number(5);
      } else {
        totalPage = Math.floor(allPost.length / Number(limit) + 1);
      }

      res.json(
        errorFunction(false, 200, "Lấy thành công !", {
          totalPage: totalPage,
          total: allPost.length,
          data: result,
        })
      );
    } catch (error) {
      res.status(400).json({
        error: error,
        message: "Bad request",
      });
    }
  },
  getByIdPost: async (req: Request, res: Response) => {
    try {
      const data = await Posts.find({ userId: req.params.id })
        .populate("placeId", "name")
        .populate("userId", ["userName", "avt"]).sort({ createdAt: -1 });

      res.json(errorFunction(false, 200, "Lấy thành công !", data));
    } catch (error) {
      res.status(400).json({
        error: error,
        message: "Bad request",
      });
    }
  },
  updatePublicPost: async (req: Request, res: Response) => {
    try {
      await Posts.findByIdAndUpdate(req.params.id, {
        public: true,
        time: Number(new Date())
      });

      res.json(errorFunction(true, 200, "Bài viết đã được công khai !"));
    } catch (error) {
      res.status(400).json({
        error: error,
        message: "Bad request",
      });
    }
  },
  deletePost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await Posts.findById<IPost>(req.params.id);

      if (!id)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      await Comments.deleteMany({
        postId: req.params.id,
      }).exec();
      await RepComments.deleteMany({ postId: req.params.id });
      await Posts.findByIdAndDelete(req.params.id);
      res.status(200).json(errorFunction(true, 200, "Xóa thành công !"));
    } catch (error) {
      res.status(400).json({
        error: error,
        message: "Bad request",
      });
    }
  },
};

export default postController;
