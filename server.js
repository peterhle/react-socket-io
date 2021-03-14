const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");
const index = require("./routes/index");
const STATIC_CHANNELS = require("./staticChannels");

const PORT = 3030;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: true,
  origins:["localhost:3000"]
});

app.use(cors());
app.use("/channels", index);

io.on("connection", (socket) => {
  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(roomId);
  });
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
