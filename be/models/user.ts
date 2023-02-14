import mongoose from "mongoose";
import { IUser } from "./../types/user";

const userSchema = new mongoose.Schema<IUser>(
  {
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
    gender: {
      type: String,
      required: false,
      default: "Nam",
    },
    description: {
      type: String,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
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
  },
  { timestamps: true }
);

const Users = mongoose.model("User", userSchema);

export default Users;
