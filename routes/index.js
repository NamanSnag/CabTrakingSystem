import express from "express";
import cabRoutes from "./cabs.js";

const router = express.Router();

router.use("/cabs", cabRoutes);

export default router;
