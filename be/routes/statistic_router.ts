import { Router } from "express";
import statisticController from "../controllers/statistic_controller";

export const statisticRouter = (router: Router) => {
  router.get(
    "/statistic/general-statistics",
    statisticController.generalStatistics
  );

  router.get(
    "/statistic/comment-statistics",
    statisticController.statisticCommentGoodOrBad
  );

  router.get(
    "/statistic/payment-statistics-day",
    statisticController.detailPaymentStatisticsForDay
  );

  router.get(
    "/statistic/payment-statistics-about",
    statisticController.detailPaymentStatisticsForAbout
  );

  // router.get(
  //   "/statistic/payment-statistics-sale-agent",
  //   statisticController.detailPaymentStatisticsForAboutSaleAgent
  // );
};
