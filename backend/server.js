const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
    changeOrigin: true,
  },
});

const { roomService } = require("./services/RoomService");

/* ---------------------------------------------------------------- Middlewares START ----------------------------------------- */

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const PORT = process.env.PORT;
require("./config/DB").connect();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.options("*", cors());
app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});
/* ---------------------------------------------------------------- Middlewares END ----------------------------------------- */

/* ---------------------------------------------------------------- Routes START ----------------------------------------- */
const roomRoute = require("./routes/RoomRoute");
const authRoute = require("./routes/Auth");
const qustionRoute = require("./routes/QuestionRoute");
const scrapRoute = require("./utils/ScapLeetCode");

app.post("/", (req, res) => {
  //   console.log("header:", req.headers);
  //   console.log("body:", req.body);
  //   console.log("cookies:", req.cookies);
  res
    .status(200)
    // .cookie("testCookie", "TestingCookie", { httpOnly: true })
    .json({ message: "success" });
});
/* ---------------------------------------------------------------- Routes END ----------------------------------------- */

/* ---------------------------------------------------------------- Consuming Routes START ----------------------------------------- */
app.use("/api/v1/room", roomRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/problems", qustionRoute);
app.use("/api/v1/scrap", scrapRoute);
/* ---------------------------------------------------------------- Consuming Routes END ----------------------------------------- */

/* ---------------------------------------------------------------- Bidirectional Connection START ----------------------------------------- */
io.on("connection", (socket) => {
  roomService(io, socket);
  //   console.log(`what is socket:`,socket);
  //   console.log(`socket is active to be connected.`);
  //   socket.on("chat-room", (payload) => {
  //     io.emit("chat-room", payload);
  //   });
});
/* ---------------------------------------------------------------- Bidirectional Connection END ----------------------------------------- */

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
