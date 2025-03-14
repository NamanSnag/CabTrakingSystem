import express from "express";

const router = express.Router();

import { authenticate } from "../midellware/authMiddleware.js";
import { getActiveCabs } from "../controllers/rideControllers.js";

router.get("/active", authenticate, getActiveCabs);

export default router;
