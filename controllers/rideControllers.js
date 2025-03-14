import prisma from "../configs/dbConfig.js";



export const getActiveCabs = async (req, res) => {
    try {
      const activeCabs = await prisma.driver.findMany({
        where: { 
          active: true,
          isBooked: false 
        },
        include: {
          car: true // Include the associated car details
        }
      });
  
      // Map the response to include driver + car details
      const response = activeCabs.map(driver => ({
        id: driver.id,
        name: driver.name,
        isBooked: driver.isBooked,
        location: { lat: driver.lat, lng: driver.lng },
        car: driver.car // Include car details like numberPlate, model, etc.
      }));
  
      res.json(response);
    } catch (error) {
      console.error("Error fetching active cabs:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };