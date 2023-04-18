import { Router } from "express";
import autoRepController from "../controllers/autoRep_controller";

export const autoRepRouter = (router: Router) => {
  router.post(
    "/auto-rep/get-message-chat-gpt",
    autoRepController.getMessageChatGpt
  );
}
 
