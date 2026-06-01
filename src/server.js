import dotenv from 'dotenv';
dotenv.config(); // 🔥 MUST BE FIRST LINE

import connectDB from '../config/db.config.js';
import app from './app.js';
import http from 'http';
import { Server } from 'socket.io'
import { connectRedis, redisClient } from '../config/redis.config.js';
import { initializeSockets } from './sockets/socketManager.js';


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: (origin, callback) => callback(null, true),
        credentials: true
    }
});
connectDB();

await connectRedis();
await redisClient.set("test", "working");
const data = await redisClient.get("test");


console.log("Redis Test:", data);
initializeSockets(io)
const PORT = process.env.PORT || 3000;
app.use('/', (req, res) => {
    res.send("Hello World")
})
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export { io };