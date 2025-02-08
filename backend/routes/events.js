const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Event = require("../models/Events"); 
const mongoose=require("mongoose");


dotenv.config();
const router = express.Router();  



const corsOptions = {
    origin: "http://localhost:5173",  
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,  
    allowedHeaders: ["Content-Type", "Authorization"]
};

router.use(cors(corsOptions));  
router.use(express.json()); 

router.get("/event", async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        console.error("Error fetching events:", err); 
        res.status(500).json({ message: "Server Error" });
    }
});

router.post("/event", async (req, res) => {
    try {
        const { title, description, date, category } = req.body;
        if (!title || !description || !date || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newEvent = new Event({ title, description, date, category });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (err) {
        console.error("Error adding event:", err); 
        res.status(500).json({ message: "Error creating event" });
    }
});

router.post("/:eventId/join", async (req, res) => {
    try {
        const { userId } = req.body;
        const eventId = req.params.eventId;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "invalid user ID format" });
        }

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        if (!event.attendees.includes(userId)) {
            event.attendees.push(userId);
            await event.save();
        s
        res.status(200).json({ message: "Joined successfully", event });
    } catch (error) {
        console.error("Error joining event:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/:eventId/leave", async (req, res) => {
    try {
        const { userId } = req.body;
        console.log("Leaving Event. User ID:", userId);

        const event = await Event.findById(req.params.eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (!event.attendees.some(id => id.toString() === userId)) {
            return res.status(400).json({ message: "You haven't joined this event yet" });
        }

        event.attendees = event.attendees.filter(id => id.toString() !== userId);
        await event.save();

        res.json({ message: "Successfully left the event", event });
    } catch (err) {
        console.error("Error leaving event:", err);
        res.status(500).json({ message: "Server Error" });
    }
});


router.get("/:eventId/attendees", async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId).populate("attendees", "name email");
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(event.attendees);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
