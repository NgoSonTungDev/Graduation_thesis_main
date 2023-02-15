import { IVoucher } from "./../types/voucher";
import Vouchers from "../models/voucher";
import { errorFunction } from "../utils/errorFunction";
import { Request, Response, NextFunction } from "express";

const fakeCode = (length: number) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

const deleteByIdEndTime = async (e: string) => {
  await Vouchers.findByIdAndDelete(e);
};

const voucherController = {
  addVoucher: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Vouchers.create({
        ...req.body,
        codeVoucher: String(fakeCode(6)),
      });
      res.json(errorFunction(false, 200, "Thêm thành công", data));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  getByIdVoucher: async (req: Request, res: Response) => {
    try {
      const data = await Vouchers.find({ placeId: req.params.id });
      res.json(errorFunction(false, 200, "Lấy thành công !", data));
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await (
        await Vouchers.find()
      ).filter((e) => {
        return e.endDate > 18;
      });

      const list = data.map((e) => e._id);

      if (list.length > 0) {
        await Promise.all(list.map((e) => deleteByIdEndTime(e)));
      }

      const newData = await Vouchers.find();

      res.json(errorFunction(false, 200, "Lấy thành công !", newData));
    } catch (error) {
      res.status(400).json({
        error: error,
        message: "Bad request",
      });
    }
  },
  deleteVoucher: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await Vouchers.findById(req.params.id);

      if (!id)
        return res
          .status(404)
          .json(errorFunction(true, 404, "Không tồn tại !"));

      await Vouchers.findByIdAndDelete(req.params.id);
      res.status(200).json(errorFunction(true, 200, "Xóa thành công !"));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
};

export default voucherController;
