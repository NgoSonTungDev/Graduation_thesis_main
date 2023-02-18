import { favouriteRoute } from "./favourite_router";
import express from "express";
import { authRoute } from "./auth_router";
import { evaluateRoute } from "./evaluate_router";
import { mailerRoute } from "./mailer_router";
import { notifyRoute } from "./notify_router";
import { placeRoute } from "./place_router";
import { postRoute } from "./post_router";
import { purposeRoute } from "./purpose_router";
import { typeRoute } from "./type_router";
import { userRoute } from "./user_router";
import { voucherRoute } from "./voucher_router";

const router = express.Router();

const routes = () => {
  purposeRoute(router);

  typeRoute(router);

  authRoute(router);

  mailerRoute(router);

  userRoute(router);

  placeRoute(router);

  evaluateRoute(router);

  voucherRoute(router);

  notifyRoute(router);

  postRoute(router);

  favouriteRoute(router);

  return router;
};

export default routes;
