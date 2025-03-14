import prisma from "../configs/dbConfig.js";
import { decode } from "../configs/jwtAuth.js";
import { errorResponse } from "../utils/responses.js";

export const authenticate = async (req, res, next) => {
  try {
    const bearerToken = req.header("Authorization");

    if (!bearerToken) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No token provided" });
    }

    const token = bearerToken.split(" ")[1];
    const userId = await decode(token);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    const user = await prisma.user.findUnique({
      where: { uuid: userId },
    });

    if (!user) {
      console.error("token validated but user not found!!!");
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};
