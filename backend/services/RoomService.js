const roomService = (io, socket) => {
  console.log(`what is socket:`, socket);
  console.log(`socket is active to be connected.`);
  socket.on("chat-room", (payload) => {
    console.log(payload);
    io.emit("chat-room", payload);
  });
};
module.exports = { roomService };
