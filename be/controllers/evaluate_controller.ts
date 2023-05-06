import Evaluates from "../models/evaluate";
import Places from "../models/place";
import { errorFunction } from "../utils/errorFunction";
import { Request, Response, NextFunction } from "express";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const updateRatingById = async (e: string, rating: number) => {
  await Places.findByIdAndUpdate(e, {
    rating: rating,
  });
};

const checkCommentPositiveOrNegative = (text: string) => {
  const positiveKeywords = ["đẹp", "tuyệt vời", "tốt"];
  const negativeKeywords = ["giá cao", "xấu", "tệ"];

  let positiveCount = 0;
  let negativeCount = 0;

  const words = text.split(" ");

  words.forEach((word) => {
    if (positiveKeywords.includes(word)) {
      positiveCount++;
    }

    if (negativeKeywords.includes(word)) {
      negativeCount++;
    }
  });

  if (positiveCount > negativeCount) {
    return "Tích cực";
  } else if (positiveCount < negativeCount) {
    return "Tiêu cực";
  } else {
    return "Trung lập";
  }
};

const evaluateController = {
  addEvaluate: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const group = await Evaluates.aggregate([
        {
          $group: {
            _id: "$placeId",
            avgRating: { $avg: "$rating" },
          },
        },
      ]);

      await Promise.all(group.map((e) => updateRatingById(e._id, e.avgRating)));

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Bình luận này là tiêu cực hay tích cực : "${req.body.content}".`,
        temperature: 0,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      });

      const data = await Evaluates.create(req.body);

      if (
        response.data.choices[0].text?.includes("\nTích cực.") ||
        response.data.choices[0].text?.includes("tích cực") ||
        response.data.choices[0].text?.includes("tích cực.")
      ) {
        await Places.findByIdAndUpdate(req.body.placeId, {
          $push: {
            statisticCmt: {
              _id: data._id,
              rateComments: true,
            },
          },
        });
        res.json(
          errorFunction(false, 200, "Ghi nhận đánh giá của bạn.", {
            data,
            message: response.data.choices[0].text + "Tích cực",
          })
        );
        console.log("Tich cuc !");
      } else if (
        response.data.choices[0].text?.includes("\n\nTiêu cực.") ||
        response.data.choices[0].text?.includes("tiêu cực") ||
        response.data.choices[0].text?.includes("tiêu cực.")
      ) {
        await Places.findByIdAndUpdate(req.body.placeId, {
          $push: {
            statisticCmt: {
              _id: data._id,
              rateComments: false,
            },
          },
        });
        res.json(
          errorFunction(false, 200, "Thêm thành công", {
            data,
            message: response.data.choices[0].text + "Tiêu cực",
          })
        );
        console.log("tieu cuc !");
      } else {
        res.json(errorFunction(true, 200, `${response.data.choices[0].text}`));
      }
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  getByIdEvaluate: async (req: Request, res: Response) => {
    try {
      const data = await Evaluates.find({ placeId: req.params.id }).populate(
        "userId",
        ["userName", "avt"]
      );
      res.json(errorFunction(false, 200, "Lấy thành công !", data));
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Evaluates.find().populate("userId", [
        "userName",
        "avt",
      ]).populate("placeId","name");

      res.json(errorFunction(false, 200, "Lấy thành công !", data));
    } catch (error) {
      res.status(400).json({
        error: error,
        message: "Bad request",
      });
    }
  },
  deleteEvaluate: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await Evaluates.findById(req.params.id);

      if (!id)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      await Evaluates.findByIdAndDelete(req.params.id);
      res.status(200).json(errorFunction(true, 200, "Xóa thành công !"));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
};

export default evaluateController;
