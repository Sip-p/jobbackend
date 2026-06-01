import User from "../models/User.js";
import Messages from "../models/Messages.js";
import Conversation from "../models/Conversation.js";
import jwt from "jsonwebtoken";

const onlineUsers = new Map();

export const initializeSockets = (io) => {

    // MIDDLEWARE: Authenticate the Socket Connection
    io.use(async (socket, next) => {
        try {
            // Support both Web (Cookies) and Mobile/Testing (Auth Payload)
            const token = socket.handshake.auth?.token || socket.handshake.headers.cookie?.split('token=')[1]?.split(';')[0];

            if (!token) return next(new Error("Authentication Error"));

            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
            const user = await User.findById(decoded.id).select("-password");

            if (!user) return next(new Error("User not found"));

            // Attach user data to the socket object!
            socket.user = user;
            next();
        } catch (err) {
            next(new Error("Authentication failed"));
        }
    });

    // ON CONNECTION: What happens when someone connects?
    io.on("connection", (socket) => {
        const userId = socket.user._id.toString();

        // 1. Add them to our online directory
        onlineUsers.set(userId, socket.id);
        console.log(`🟢 User ${socket.user.name} connected. Online count: ${onlineUsers.size}`);

        // 2. LISTEN: When the user sends a message
        socket.on("send_message", async (data) => {
            let { receiverId, conversationId, text } = data;

            try {
                // 🚀 NEW LOGIC: Create conversation if this is their very first message!
                if (!conversationId) {
                    const newConv = await Conversation.create({
                        participants: [userId, receiverId],
                        senderId: userId,
                        recieverId: receiverId,
                        lastMessage: text,
                        recievedAt: new Date()
                    });
                    // Grab the newly created ID to use below
                    conversationId = newConv._id;
                } else {
                    // Update the existing folder with the latest preview
                    await Conversation.findByIdAndUpdate(conversationId, {
                        lastMessage: text,
                        senderId: userId,
                        recieverId: receiverId,
                        recievedAt: new Date()
                    });
                }

                // A. Save the message to MongoDB immediately
                const newMessage = await Messages.create({
                    conversationId,
                    senderId: userId,
                    recieverId: receiverId,
                    message: text
                });

                // B. Target the receiver's specific Socket ID
                const receiverSocketId = onlineUsers.get(receiverId);

                // C. If the receiver is currently online, push it to them instantly!
                if (receiverSocketId) {
                    // We also send the created conversationId back so the frontend knows!
                    io.to(receiverSocketId).emit("receive_message", { ...newMessage._doc, conversationId });
                }

                // (Note: If they aren't online, we don't do anything because we already saved it to the DB. They see it when they log in).
            } catch (error) {
                console.error("Failed to send message", error);
            }
        });

        // 3. LISTEN: When the user disconnects
        socket.on("disconnect", () => {
            onlineUsers.delete(userId);
            console.log(`🔴 User ${socket.user.name} disconnected.`);
        });
    });
};