import { errorFunction } from "../utils/errorFunction";
import { Request, Response, NextFunction } from "express";
import Comments from "../models/comment";
import Posts from "../models/post";
import RepComments from "../models/repComment";
import Places from "../models/place";
import Favourites from "../models/favourite";

const likeController = {
  likePost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await Posts.findById(req.params.id);

      if (!id)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      const check = id.like?.find((e: string) => {
        return e === req.body.userId;
      });

      if (check) {
        res.json(errorFunction(true, 200, "Bạn đã like bài viết ."));
      } else {
        await id.updateOne({ $push: { like: req.body.userId } });
        res.json(errorFunction(true, 200, "Đã like bài viết ."));
      }
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  favouritePlace: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await Places.findById(req.params.id);

      if (!id)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      const check = id.favourite?.find((e: string) => {
        return e === req.body.userId;
      });

      if (check) {
        res.json(errorFunction(true, 200, "Bạn đã yêu thích địa điểm này ."));
      } else {
        await id.updateOne({ $push: { favourite: req.body.userId } });
        await Favourites.create({
          placeId: req.params.id,
          userId: req.body.userId,
        });

        res.json(errorFunction(true, 200, "Đã yêu thích địa điểm này ."));
      }
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  disFavouritePlace: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await Places.updateMany(
        { _id: req.params.id },
        { $pull: { favourite: req.body.userId } }
      );

      const checkId = await Favourites.findOne({
        placeId: req.params.id,
        userId: req.body.userId,
      });

      await Favourites.findByIdAndDelete(checkId?._id);

      res.json(errorFunction(true, 200, "Bạn Xoá khỏi yêu thích ."));
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

      const check = id.like?.find((e: string) => {
        return e === req.body.userId;
      });

      if (check) {
        res.json(errorFunction(true, 200, "Bạn đã like bài viết ."));
      } else {
        await id.updateOne({ $push: { like: req.body.userId } });
        res.json(errorFunction(true, 200, "Đã like bài viết ."));
      }
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

      const check = id.like?.find((e: string) => {
        return e === req.body.userId;
      });

      if (check) {
        res.json(errorFunction(true, 200, "Bạn đã like bài viết ."));
      } else {
        await id.updateOne({ $push: { like: req.body.userId } });
        res.json(errorFunction(true, 200, "Đã like bài viết ."));
      }
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
};

export default likeController;
