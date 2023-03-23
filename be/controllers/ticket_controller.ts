import { ITicket } from "./../types/ticket";
import { IPlace } from "./../types/place";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import Places from "../models/place";
import Users from "../models/user";
import { IUser } from "../types/user";
import { errorFunction } from "../utils/errorFunction";
import Tickets from "../models/ticket";

function isWithinRange(number: number, min: number, max: number) {
  return isFinite(number) && number >= min && number <= max;
}

const ticketController = {
  addTicket: async (req: Request, res: Response) => {
    try {
      const placeId = await Places.findById<IPlace>(req.body.placeId);

      if (!placeId)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      if (
        isWithinRange(
          req.body.adultTicket,
          placeId.startingPrice,
          placeId.LastPrice
        ) === false
      ) {
        return res
          .status(400)
          .json(errorFunction(true, 404, "Mức giá không được cho phép !"));
      } else if (
        isWithinRange(
          req.body.childTicket,
          placeId.startingPrice,
          placeId.LastPrice
        ) === false
      ) {
        return res
          .status(400)
          .json(errorFunction(true, 404, "Mức giá không được cho phép !"));
      } else {
        const data = await Tickets.create(req.body);
        return res
          .status(200)
          .json(errorFunction(false, 200, "Thêm thành công !", data));
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getByIdTicket: async (req: Request, res: Response) => {
    try {
      const ticket = await Tickets.findById<ITicket>(req.params.id)
        .populate("placeId", ["name", "location", "startingPrice", "LastPrice"])
        .populate("salesAgentId", ["userName", "email"]);

      if (!ticket)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      res.json(errorFunction(false, 200, "Lấy thành công !", ticket));
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getPlaceId: async (req: Request, res: Response) => {
    try {
      const data = await Tickets.find<ITicket[]>({
        placeId: req.params.id,
      })
        .populate("placeId", ["name", "location", "startingPrice", "LastPrice"])
        .populate("salesAgentId", ["userName", "email"]);

      if (!data)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      res.json(errorFunction(false, 200, "Lấy thành công !", data));
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getSalesAgentId: async (req: Request, res: Response) => {
    try {
      const data = await Tickets.find<ITicket[]>({
        salesAgentId: req.params.id,
      })
        .populate("placeId", ["name", "location", "startingPrice", "LastPrice"])
        .populate("salesAgentId", ["userName", "email"]);

      if (!data)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      res.json(errorFunction(false, 200, "Lấy thành công !", data));
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllTicket: async (req: Request, res: Response) => {
    try {
      const { pageNumber, userName, limit } = req.query;

      const SkipNumber = (Number(pageNumber) - 1) * Number(limit);

      const condition = userName
        ? { userName: { $regex: new RegExp(userName + ""), $options: "i" } }
        : {};

      const allUser = await Users.find(condition);

      const result = await Users.find(condition)
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
  updateTicket: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const TicketId = await Tickets.findById(req.params.id);

      if (!TicketId)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      await TicketId.updateOne({ $set: req.body });

      res.json(errorFunction(true, 200, "Cập nhật thành công !"));
    } catch (error) {
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  deleteTicket: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await Tickets.findById(req.params.id);

      if (!id)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      await Tickets.findByIdAndDelete(req.params.id);
      res.status(200).json(errorFunction(true, 200, "Xóa thành công !"));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
};

export default ticketController;
