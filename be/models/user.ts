import { number } from "joi";
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
      default: "",
    },
    gender: {
      type: String,
      required: false,
      default: "Nam",
    },
    isAdmin: {
      type: Number,
      required: false,
      default: 1,
    },
    isLock: {
      type: Boolean,
      required: false,
      default: false,
    },
    numberPhone: {
      type: String,
      required: false,
      default: "",
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
