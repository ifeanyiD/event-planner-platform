import dotenv from "dotenv";

dotenv.config({path : "./.env"});

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/auth.js";
import {router, authRouter} from "./routes/messageRoutes.js";
import Message from "./models/Message.js";
import { adminOnly } from "./middleware/adminMiddleware.js";
import cookieParser from "cookie-parser"
import { verifyToken } from "./config/verifyToken.js";
import eventRoutes from "./routes/eventRoute.js";
import statsRoutes from "./routes/dashboardRoutes.js";
import uploader  from "./routes/uploadRoute.js";
import users from "./routes/usersRoute.js";
import publicRoutes from "./routes/publicRoutes.js";
import { roleCheck } from "./middleware/roleCheck.js";
import dns from  "dns";
import allowedOrigins from "./config/allowedOrigins.js";

const app = express();

dns.setServers(["1.1.1.1", "8.8.8.8"]);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://chizzyevent.netlify.app"
    ],
    credentials: true
  }
});

app.use(express.json());
app.use(cookieParser())


// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//Login, Register, Refresher
app.use("/api/auth", authRoutes);
app.use("/api/messages", router);
app.use("/api/public", publicRoutes);

// Protected Route
app.use(verifyToken);

// ROUTES
app.use("/api/users", adminOnly, users);
app.use("/api/stats", adminOnly, statsRoutes);
app.use("/api/messages", adminOnly, authRouter);
app.use("/api/image", roleCheck("admin", "vendor"), uploader);

app.use("/api/events", eventRoutes)

// Socket.io
io.on("connection", (socket) => {
  console.log("Admin connected");

  socket.on("newMessage", async (data) => {
    const saved = await Message.create(data);
    io.emit("receiveMessage", saved);

    //updating dashboard stats
    const totalMessages = await Message.countDocuments();
    const unreadMessages = await Message.countDocuments({isRead : false});

    io.emit("dashboardUpdate", {
      totalMessages,
      unreadMessages
    });
  });
});

server.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);