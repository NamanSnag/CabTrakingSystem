import prisma from "../configs/dbConfig.js";
import { successResponse } from "../utils/responses.js";

export const getActiveCabs = async (req, res, next) => {
  try {
    const activeCabs = await prisma.driver.findMany({
      where: {
        active: true,
        isBooked: false,
      },
      include: {
        car: true, // Include the associated car details
      },
    });

    // Map the response to include driver + car details
    const response = activeCabs.map((driver) => ({
      id: driver.id,
      name: driver.name,
      isBooked: driver.isBooked,
      location: { lat: driver.lat, lng: driver.lng },
      car: driver.car, // Include car details like numberPlate, model, etc.
    }));

    return res.status(200).json(successResponse(response, "list of active cabs"));
  } catch (error) {
    console.error("Error fetching active cabs:", error);
    next(error);
  }
};
