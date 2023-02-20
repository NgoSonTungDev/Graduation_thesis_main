import { Router } from "express";
import voucherController from "../controllers/voucher_controller";
import { voucherValidation } from "../helpers/voucher";

export const voucherRouter = (router: Router) => {
  router.post("/voucher/add", voucherValidation, voucherController.addVoucher);

  router.get("/voucher/get-all", voucherController.getAll);

  router.get("/voucher/get-by-id/:id", voucherController.getByIdVoucher);

  router.delete("/voucher/delete/:id", voucherController.deleteVoucher);
};
