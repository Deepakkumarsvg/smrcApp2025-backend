import dotenv from "dotenv";
import express from "express";
import cron from "node-cron";
import pkg from "body-parser";
import cors from "cors";
import { createServer } from "http";
import indexRouter from "./routes/index.js";
import userRoutes from "./routes/users.js";
import activityRoutes from "./routes/activity.js";
import { getActiveActivity } from "./services/getActiveActivity.js";
import { notFoundHandler, globalHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const { json } = pkg;
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ limit: "2mb", extended: true }));

// CHECKS ENDPOINT
app.use("/", indexRouter);
app.use("/users", userRoutes);
app.use("/activity", activityRoutes);

const server = createServer(app);

app.get("/ping", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Node Application Is started",
  });
});

app.use(notFoundHandler);

app.use(globalHandler);

server.listen(PORT, () => {
  console.log(`Socket server running on port ${PORT}`);
});
