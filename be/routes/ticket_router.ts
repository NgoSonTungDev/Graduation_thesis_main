import { ticketValidation } from "./../helpers/ticket";
import { Router } from "express";
import ticketController from "../controllers/ticket_controller";

export const ticketRouter = (router: Router) => {
  router.post(
    "/ticket/add-ticket",
    ticketValidation,
    ticketController.addTicket
  );

  router.get("/ticket/get-all-ticket", ticketController.getAll);

  router.get("/ticket/get-by-id/:id", ticketController.getByIdTicket);

  router.get("/ticket/get-by-id-place/:id", ticketController.getPlaceId);

  router.get(
    "/ticket/get-by-id-sale-agent/:id",
    ticketController.getSalesAgentId
  );

  router.put("/ticket/update/:id", ticketController.updateTicket);

  router.delete("/ticket/delete/:id", ticketController.deleteTicket);
};
