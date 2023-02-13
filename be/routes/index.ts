import express from "express";
import { authRoute } from "./auth_router";

const router = express.Router();

const routes = () => {
  authRoute(router);

  return router;
};

export default routes;
