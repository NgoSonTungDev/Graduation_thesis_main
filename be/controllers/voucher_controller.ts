import { IVoucher } from "./../types/voucher";
import Vouchers from "../models/voucher";
import { errorFunction } from "../utils/errorFunction";
import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";

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

const updatePublicVoucher = async (e: string, status: boolean) => {
  await Vouchers.findByIdAndUpdate(e, {
    public: status,
  });
};

const voucherController = {
  addVoucher: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Vouchers.create({
        ...req.body,
        codeVoucher: String(fakeCode(6)),
        public: Number(new Date()) < req.body.startDate ? false : true,
      });
      res.json(errorFunction(false, 200, "Thêm thành công", data));
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({
        message: "Bad request",
      });
    }
  },
  getByPlaceId: async (req: Request, res: Response) => {
    try {
      const data = await Vouchers.aggregate([
        {
          $match: {
            $and: [
              {
                placeId: req.params.placeId,
              },
              {
                public: true,
              },
            ],
          },
        },
      ]);

      res.json(errorFunction(false, 200, "Lấy thành công !", data));
    } catch (error) {
      res.status(500).json(error);
    }
  },
  findVoucher: async (req: Request, res: Response) => {
    try {
      const { codeVoucher, placeId } = req.query;

      const data = await Vouchers.findOne({
        codeVoucher: codeVoucher,
      }).populate("placeId", "name");

      if (String(data?.placeId?._id) === placeId && data?.public === true) {
        res.json(errorFunction(false, 200, "Áp dụng mã thành công !", data));
      } else {
        res
          .status(402)
          .json(
            errorFunction(false, 402, "Không sử dụng được mã giảm giá này!")
          );
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { placeID, active } = req.query;

      // const currentDate = new Date();

      // const dataStartTime = await (
      //   await Vouchers.find()
      // ).filter((e) => {
      //   return (
      //     currentDate >= new Date(e.startDate) &&
      //     currentDate <= new Date(e.endDate)
      //   );
      // });

      //   await Promise.all(listStartTime.map((e) => updatePublicVoucher(e, true)));

      // const dataEndTime = await (
      //   await Vouchers.find()
      // ).filter((e) => {
      //   return new Date(e.endDate) > new Date();
      // });

      // const listStartTime = dataStartTime.map((e) => e._id);

      // const listEndTime = dataEndTime.map((e) => e._id);

      //   await Promise.all(listEndTime.map((e) => updatePublicVoucher(e, false)));

      const condition = placeID
        ? { placeId: placeID, public: active }
        : { public: active };

      const newData = await Vouchers.find(condition).populate(
        "placeId",
        "name"
      );

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
