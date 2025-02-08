const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const socketIo = require("socket.io");
const connectDB = require("./db");
const authRoutes = require("./routes/auth");  

const eventRoutes = require("./routes/Events");  


dotenv.config();

const app = express();

const corsOptions = {
    origin: "http://localhost:5173",  
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,  
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions)); 
app.use(express.json()); 

app.use("/api/auth", authRoutes);  
app.use("/api/events", eventRoutes); 



const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ error: "Access Denied" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = user;
        next();
    });
};

const server = http.createServer(app);  
const io = socketIo(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
    console.log(`new user connected: ${socket.id}`);

    socket.on("joinEvent", (eventId) => {
        console.log(`user ${socket.id} joined event: ${eventId}`);
        socket.join(eventId);
    });

    socket.on("attendeeJoined", (eventId, attendee) => {
        console.log(`new attendee joined event ${eventId}:`, attendee);
        io.to(eventId).emit("updateAttendees", attendee);
    });

    socket.on("disconnect", () => {
        console.log(`user disconnected: ${socket.id}`);
    });
});


const PORT = 5000;

(async () => {
    await connectDB();
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
