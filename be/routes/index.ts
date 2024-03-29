import { ticketRouter } from "./ticket_router";
import { likeRouter } from "./like_router";
import { statisticRouter } from "./statistic_router";
import { paymentRouter } from "./payment_router";
import { roomRouter } from "./room_router";
import express from "express";
import { authRouter } from "./auth_router";
import { autoRepRouter } from "./autoRep_router";
import { commentRouter } from "./comment_router";
import { evaluateRouter } from "./evaluate_router";
import { favouriteRouter } from "./favourite_router";
import { mailerRouter } from "./mailer_router";
import { notifyRouter } from "./notify_router";
import { orderRouter } from "./order_router";
import { placeRouter } from "./place_router";
import { postRouter } from "./post_router";
import { purposeRouter } from "./purpose_router";
import { repCommentRouter } from "./repComment_router";
import { typeRouter } from "./type_router";
import { userRouter } from "./user_router";
import { voucherRouter } from "./voucher_router";

const router = express.Router();

const routes = () => {
  purposeRouter(router);

  typeRouter(router);

  authRouter(router);

  mailerRouter(router);

  userRouter(router);

  placeRouter(router);

  evaluateRouter(router);

  voucherRouter(router);

  notifyRouter(router);

  postRouter(router);

  favouriteRouter(router);

  orderRouter(router);

  commentRouter(router);

  repCommentRouter(router);

  autoRepRouter(router);

  roomRouter(router);

  paymentRouter(router);

  statisticRouter(router);

  likeRouter(router);

  ticketRouter(router);

  return router;
};

export default routes;
