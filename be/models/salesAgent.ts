import mongoose from "mongoose";
import { ISalesAgent } from "./../types/sales_agent";

const salesAgentSchema = new mongoose.Schema<ISalesAgent>({
  code: {
    type: String,
    required: false,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  numberPhone: {
    type: String,
    required: false,
  },
  avt: {
    type: String,
    default:
      "https://scarpa-us.com/wp-content/uploads/2020/05/cham-toi-ky-quan-tien-canh-trong-sieu-pham-avatar-.jpeg",
  },
});

const SalesAgents = mongoose.model("SalesAgent", salesAgentSchema);

export default SalesAgents;
