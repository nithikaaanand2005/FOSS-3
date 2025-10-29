const express = require("express");
const http = require("http");
const { createClient } = require("redis");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Local Redis connection
const redisClient = createClient();

async function connectRedis() {
  await redisClient.connect();
  console.log("Connected to local Redis");
}
connectRedis();

// Create a subscriber to listen to Redis channel
const subscriber = redisClient.duplicate();
subscriber.connect().then(() => {
  console.log("Redis subscriber connected.");
  subscriber.subscribe("notifications", (message) => {
    console.log("Received notification from Redis:", message);
    io.emit("notification", message);
  });
});

// Serve static files (index.html)
app.use(express.static(__dirname));

// API to publish a notification via HTTP POST
app.post("/like/:username", async (req, res) => {
  const username = req.params.username;
  const message = `${username} liked your post!`;
  await redisClient.publish("notifications", message);
  res.send(`Notification sent: ${message}`);
});

// Socket.io connection event
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
