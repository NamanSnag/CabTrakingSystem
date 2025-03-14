import prisma from "../configs/dbConfig.js";

export const updateDriverLocation = async (io, data) => {
  const { cabId, lat, lng } = data;

  try {
    // Instead of directly updating the driver's location in db we can wrtie in inmemory cache like redis
    // and update it in db in a batch process
    // This will reduce the number of db calls and improve the performance
    await prisma.driver.update({
      where: { id: cabId },
      data: { currentLocation: { lat, lng } },
    });

    io.emit("locationUpdate", { cabId, lat, lng });
  } catch (error) {
    console.error("Error updating cab location:", error);
  }
};
