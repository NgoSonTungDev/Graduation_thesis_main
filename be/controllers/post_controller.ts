import { NextFunction, Request, Response } from "express";
import Posts from "../models/post";
import { errorFunction } from "../utils/errorFunction";

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
      const { pageNumber, placeID } = req.query;

      const SkipNumber = (Number(pageNumber) - 1) * Number(5);

      const condition = placeID ? { placeId: placeID } : {};

      const allUser = await Posts.find({ condition });
      console.log({ placeID, pageNumber });

      const result = await Posts.find(condition)
        .skip(SkipNumber)
        .limit(Number(5))
        .populate("userId",["userName","avt"])
        .populate("placeId", "name");

      let totalPage = 0;
      if (allUser.length % Number(5) === 0) {
        totalPage = allUser.length / Number(5);
      } else {
        totalPage = Math.floor(allUser.length / Number(5) + 1);
      }

      res.json(
        errorFunction(false, 200, "Lấy thành công !", {
          totalPage: totalPage,
          total: allUser.length,
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
        .populate("userId", "userName");

      res.json(errorFunction(false, 200, "Lấy thành công !", data));
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updatePublicPost: async (req: Request, res: Response) => {
    try {
      await Posts.findByIdAndUpdate(req.params.id, {
        public: true,
      });

      res.json(errorFunction(true, 200, "Bài viết đã được công khai !"));
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deletePost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await Posts.findById(req.params.id);

      if (!id)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      await Posts.findByIdAndDelete(req.params.id);
      res.status(200).json(errorFunction(true, 200, "Xóa thành công !"));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
};

export default postController;
