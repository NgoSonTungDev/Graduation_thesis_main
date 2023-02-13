import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import routes from "./routes";

import { IAuth } from "./types/auth";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("common"));
dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user: IAuth;
    }
  }
}

mongoose.connect(process.env.MONGODB_CONNECT_DATABASE + "", (err) => {
  if (err) {
    console.log("Error : " + err);
  } else {
    console.log("Connect mongoose successfully !");
  }
});

app.use("/api", routes());

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log(`Server is running port ${PORT} ...`);
});
