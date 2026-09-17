import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import { connectDB } from "./config/database.js";
import Message from "./models/Message.js";

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "https://chizzyevent.netlify.app",
        ],
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("Admin connected");

    socket.on("newMessage", async (data) => {
        const saved = await Message.create(data);

        io.emit("receiveMessage", saved);

        const totalMessages = await Message.countDocuments();
        const unreadMessages = await Message.countDocuments({
            isRead: false,
        });

        io.emit("dashboardUpdate", {
            totalMessages,
            unreadMessages,
        });
    });
});


const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error("Server startup failed:", error.message);
  process.exit(1)
});