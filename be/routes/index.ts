import express from "express";
import { authRoute } from "./auth";
import { placeRoute } from "./place";
import { mailerRoute } from "./mailer";
import { purposeRoute } from "./purpose_router";
import { typeRoute } from "./type_router";
import { userRoute } from "./user";

const router = express.Router();

const routes = () => {
  purposeRoute(router);

  typeRoute(router);

  authRoute(router);

  mailerRoute(router);

  userRoute(router);

  placeRoute(router);

  return router;
};

export default routes;
