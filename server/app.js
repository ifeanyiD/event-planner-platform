import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";
import { router, authRouter } from "./routes/messageRoutes.js";
import { adminOnly } from "./middleware/adminMiddleware.js";
import { verifyToken } from "./config/verifyToken.js";
import eventRoutes from "./routes/eventRoute.js";
import statsRoutes from "./routes/dashboardRoutes.js";
import uploader from "./routes/uploadRoute.js";
import users from "./routes/usersRoute.js";
import { roleCheck } from "./middleware/roleCheck.js";
import allowedOrigins from "./config/allowedOrigins.js";


const app = express();

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());


// PUBLIC ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/messages", router);

// PROTECTED ROUTES
app.use(verifyToken);

app.use("/api/users", adminOnly, users);
app.use("/api/stats", adminOnly, statsRoutes);
app.use("/api/messages", adminOnly, authRouter);
app.use("/api/image", roleCheck("admin", "vendor"), uploader);
app.use("/api/events", eventRoutes);

export default app;