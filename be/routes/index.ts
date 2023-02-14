import express from "express";
import { authRoute } from "./auth";
import { MailerRoute } from "./mailer";
import { purposeRoute } from "./purpose_router";
import { typeRoute } from "./type_router";

const router = express.Router();

const routes = () => {
  purposeRoute(router);

  typeRoute(router);

  authRoute(router);

  MailerRoute(router);

  return router;
};

export default routes;
