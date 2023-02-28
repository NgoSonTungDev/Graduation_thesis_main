import { Router } from "express";
import statisticController from "../controllers/statistic_controller";

export const statisticRouter = (router: Router) => {
  router.get(
    "/statistic/general-statistics",
    statisticController.generalStatistics
  );

  router.get(
    "/statistic/payment-statistics",
    statisticController.detailPaymentStatistics
  );
};
