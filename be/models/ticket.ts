import mongoose from "mongoose";
import { ITicket } from "./../types/ticket";
const Schema = mongoose.Schema;

const ticketSchema = new mongoose.Schema<ITicket>({
  salesAgentId: { type: Schema.Types.ObjectId, ref: "User" },
  adultTicket: {
    type: Number,
    required: true,
  },
  childTicket: {
    type: Number,
    required: true,
  },
  numberTickets: {
    type: Number,
    required: true,
  },
  placeId: { type: Schema.Types.ObjectId, ref: "Place" },
});

const Tickets = mongoose.model("Ticket", ticketSchema);

export default Tickets;
