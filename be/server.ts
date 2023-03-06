import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import routes from "./routes";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

const app = express();
// app.use(cors());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("common"));
dotenv.config();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// const io = new Server(server);

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("join_room_notify", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room notify: ${data}`);
  });

  socket.on("send_notify", (data) => {
    socket.to(data.room).emit("receive_notify", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

mongoose.connect(process.env.MONGODB_CONNECT_DATABASE + "", (err) => {
  if (err) {
    console.log("Error : " + err);
  } else {
    console.log("Connect mongoose successfully !");
  }
});

app.use("/api", routes());

const PORT = process.env.PORT || 5000;

server.listen(PORT, function () {
  console.log(`Server is running port ${PORT} ...`);
});
