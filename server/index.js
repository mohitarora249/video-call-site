const { Server } = require("socket.io");

/**
 * @description Create a socket.io server instance
 * @param {number} port - The port to listen on
 * @param {object} options - Configuration options for the socket.io server
 * @param {boolean} options.cors - Enable CORS requests
 * @returns {Server} - The socket.io server instance
 */
const io = new Server(8000, {
  cors: true,
});

const userIdToSocketIdMap = new Map();

io.on("connection", (socket) => {
  socket.on("join:room", (data) => {
    console.log("join:room | ", data);
    const { roomId, userId } = data;
    socket.join(roomId);
    userIdToSocketIdMap.set(userId, socket.id);
    socket.broadcast.to(roomId).emit("user:joined", {
      userId,
    });
    socket.emit("joined:room", {
      roomId,
    });
  });
  socket.on("create:room", (data) => {
    console.log("create:room | ", data);
    const { roomId, userId } = data;
    socket.join(roomId);
    userIdToSocketIdMap.set(userId, socket.id);
    socket.emit("joined:room", {
      roomId,
    });
  });
});
