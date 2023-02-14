import mongoose from "mongoose";
import { IUser } from "./../types/user";

const userSchema = new mongoose.Schema<IUser>({

}, { timestamps: true });

const Users = mongoose.model("User", userSchema);

export default Users;

///////////////////////
import { Request, Response, NextFunction } from "express";
import { errorFunction } from "../utils/errorFunction";
import Users from "../models/user";

const userController = {
deleteType: async (req: Request, res: Response, next: NextFunction) => {
try {
} catch (error) {
console.log("error: ", error);
res.status(400).json({
error: error,
message: "Bad request",
});
}
},
};

export default userController;
