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
const socketIdToUserIdMap = new Map();

io.on("connection", (socket) => {
  socket.on("join:room", (data) => {
    const { roomId, userId } = data;
    console.log("join:room | ", userId);
    socket.join(roomId);
    userIdToSocketIdMap.set(userId, socket.id);
    socketIdToUserIdMap.set(socket.id, userId);
    socket.broadcast.to(roomId).emit("user:joined", {
      userId,
    });
    socket.emit("joined:room", {
      roomId,
    });
    console.log("=====================");
    console.log("userIdToSocketIdMap : ", userIdToSocketIdMap);
    console.log("socketIdToUserIdMap : ", socketIdToUserIdMap);
    console.log("=====================");
  });
  socket.on("create:room", (data) => {
    const { roomId, userId } = data;
    console.log("create:room | ", userId);
    socket.join(roomId);
    userIdToSocketIdMap.set(userId, socket.id);
    socketIdToUserIdMap.set(socket.id, userId);
    socket.emit("joined:room", {
      roomId,
      userId,
    });
    console.log("=====================");
    console.log("userIdToSocketIdMap : ", userIdToSocketIdMap);
    console.log("socketIdToUserIdMap : ", socketIdToUserIdMap);
    console.log("=====================");
  });
  socket.on("call:user", (data) => {
    const { userId, offer } = data;
    console.log("call:user | ", userId);
    const socketId = userIdToSocketIdMap.get(userId);
    socket.to(socketId).emit("incoming:call", {
      from: socketIdToUserIdMap.get(socket.id),
      offer,
    });
    console.log("=====================");
    console.log("userIdToSocketIdMap : ", userIdToSocketIdMap);
    console.log("socketIdToUserIdMap : ", socketIdToUserIdMap);
    console.log("=====================");
  });
  socket.on("call:accepted", (data) => {
    const { userId, answer } = data;
    console.log("call:accepted | ", userId);
    const socketId = userIdToSocketIdMap.get(userId);
    socket.to(socketId).emit("call:accepted", {
      answer,
    });
    console.log("=====================");
    console.log("userIdToSocketIdMap : ", userIdToSocketIdMap);
    console.log("socketIdToUserIdMap : ", socketIdToUserIdMap);
    console.log("=====================");
  });
});
