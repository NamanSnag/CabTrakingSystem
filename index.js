import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import routes from "./routes/index.js";

const PORT = process.env.PORT || 3000;
const DOMAIN = process.env.DOMAIN || "localhost";

const app = express();

// Middleware
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