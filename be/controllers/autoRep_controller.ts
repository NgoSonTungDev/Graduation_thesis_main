import AutoReps from "../models/autoReply";
import { errorFunction } from "../utils/errorFunction";
import { Request, Response, NextFunction } from "express";

const autoRepController = {
  addRep: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await AutoReps.findOne({
        question: req.body.question,
      });
      if (!data) {
        const result = await AutoReps.create(req.body);
        res.json(errorFunction(false, 200, "Thêm thành công", result));
      } else {
        res
          .status(400)
          .json(errorFunction(true, 400, "Đã tồn tại câu hỏi này !"));
      }
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  getAn: async (req: Request, res: Response) => {
    try {
      const data = await AutoReps.find({
        question: { $regex: new RegExp(req.body.question + ""), $options: "i" },
      });

      if (data.length > 0) {
        res.json(
          errorFunction(false, 200, "Có lời nhắn !", {
            type: true,
            content: data[0].content,
            dateTime: Number(new Date()),
          })
        );
      } else {
        res.json(
          errorFunction(false, 200, "Không có lời nhắn !", {
            type: true,
            content: `Thật ngại quá 😳. Tin nhắn này của bạn không nằm trong chương trình trả lời tự động của tôi mong bạn thông cảm 😋.
            Bạn có thể liên hệ trực tiếp với người quản lý của tôi qua Facebook (https://www.facebook.com/sontung0309/) or Zalo(0522564268)`,
            dateTime: Number(new Date()),
          })
        );
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAll: async (req: Request, res: Response) => {
    try {
      const { question } = req.query;

      const condition = question
        ? { question: { $regex: new RegExp(question + ""), $options: "i" } }
        : {};

      const result = await AutoReps.find(condition);

      res.json(
        errorFunction(false, 200, "Lấy thành công !", {
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
  updateRep: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Id = await AutoReps.findById(req.params.id);

      if (!Id)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      await Id.updateOne({ $set: req.body });

      res.json(errorFunction(true, 200, "Cập nhật thành công !"));
    } catch (error) {
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  deleteRep: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await AutoReps.findById(req.params.id);

      if (!id)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      await AutoReps.findByIdAndDelete(req.params.id);
      res.status(200).json(errorFunction(true, 200, "Xóa thành công !"));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
};

export default autoRepController;
