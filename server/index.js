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

io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);
});
