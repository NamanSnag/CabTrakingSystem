import express from "express";
import dotenv from "dotenv";
import http from "http";
dotenv.config();
import cors from "cors";
import { Server } from "socket.io";
import rateLimit from "express-rate-limit";

import Socket from "./socket/index.js";
import routes from "./routes/index.js";
import { decode } from "./configs/jwtAuth.js";

const PORT = process.env.PORT || 3000;
const DOMAIN = process.env.DOMAIN || "localhost";
const ALLOW_CROSS_ORIGIN = process.env.ALLOW_ORIGIN;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ALLOW_CROSS_ORIGIN,
    methods: ["GET", "POST"],
  },
});

io.use((connection, next) => {
  const token = connection.handshake.auth.token;

  if (!token)
    return next(new Error("Authentication error: Token not provided"));

  decode(token)
    .then((user) => {
      connection.user = user;
      Socket(io);
      next();
    })
    .catch((err) => {
      next(err);
    });
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes 
  max: 100, // Limit each IP to 100 requests per `window` (15 minutes)
  message: {
    success: false,
    status: 429,
    message: "Too many requests, please try again later.",
  },
  headers: true,
});

// Middleware
app.use(apiLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api/v1", routes);

// Error handler
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: message,
    stack: err.stack,
  });
});

app.listen(PORT, () => {
  console.log(`Server started : ${DOMAIN}:${PORT}`);
});
