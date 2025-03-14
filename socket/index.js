import { updateDriverLocation } from "./locationController.js";

const Socket = (io) => {
  io.on("connection", (socket) => {

    socket.on("updateLocation", (data) => updateDriverLocation(io, data));
  });

  io.on("disconnect", () => {
    console.log("user disconnected");
  });
};

export default Socket;
