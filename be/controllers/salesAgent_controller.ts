import { ISalesAgent } from "./../types/sales_agent";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import SalesAgents from "../models/salesAgent";
import { errorFunction } from "../utils/errorFunction";

const salesAgentController = {
  getAnSalesAgent: async (req: Request, res: Response) => {
    try {
      const user = await SalesAgents.findById<ISalesAgent>(req.params.id);

      if (!user)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      res.json(errorFunction(false, 200, "Lấy thành công !", user));
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllSalesAgent: async (req: Request, res: Response) => {
    try {
      const { pageNumber, userName, limit } = req.query;

      const SkipNumber = (Number(pageNumber) - 1) * Number(limit);

      const condition = userName
        ? { userName: { $regex: new RegExp(userName + ""), $options: "i" } }
        : {};

      const allUser = await SalesAgents.find(condition);

      const result = await SalesAgents.find(condition)
        .skip(SkipNumber)
        .limit(Number(limit));

      let totalPage = 0;

      if (allUser.length) {
        totalPage = Math.ceil(allUser.length / Number(limit));
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
  updateSalesAgent: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = await SalesAgents.findById(req.params.id);

      if (!userId)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      await userId.updateOne({ $set: req.body });

      res.json(errorFunction(true, 200, "Cập nhật thành công !"));
    } catch (error) {
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  updatePassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await SalesAgents.findById(req.params.id);

      if (!id)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await SalesAgents.updateOne({
        $set: {
          password: hashedPassword,
        },
      });
      res.json(errorFunction(true, 200, "Cập nhật mật khẩu thành công !"));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  changePassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await SalesAgents.findById(req.params.id);

      if (!id)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await SalesAgents.updateOne({
        $set: {
          password: hashedPassword,
        },
      });
      res.json(errorFunction(true, 200, "Cập nhật mật khẩu thành công !"));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  deleteSalesAgent: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await SalesAgents.findById(req.params.id);

      if (!id)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      await SalesAgents.findByIdAndDelete(req.params.id);
      res.status(200).json(errorFunction(true, 200, "Xóa thành công !"));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
};

export default salesAgentController;