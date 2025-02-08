import { useState, useEffect,useRef  } from "react";
import {jwtDecode} from "jwt-decode"; 
import { io } from "socket.io-client";
//import EventForm from "./EventForm";
import "../styles/DashboardUI.css";

const DashboardUI = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [category, setCategory] = useState("all");
    const [date, setDate] = useState("");
    const [userId,setUserId] = useState(""); 
    const [attendees, setAttendees] = useState([]);
    //const [socket, setSocket] = useState(null);
    const socketRef = useRef(null);



    useEffect(() => {
        socketRef.current = io("http://localhost:5000");
    
        socketRef.current.on("connect", () => {
            console.log("Connected to WebSocket server:", socketRef.current.id);
        });
    
        socketRef.current.on("disconnect", () => {
            console.log("Disconnected from WebSocket server");
        });
    
        return () => {
            socketRef.current.disconnect();
        };
    }, []);
    
    


    useEffect(() => {
        if (events.length === 0) return; 
        events.forEach(event => socketRef.current?.emit("joinEvent", event._id));
    
        socketRef.current?.on("updateAttendees", (eventId, newAttendee) => {
            console.log("Received new attendee:", newAttendee);
            
            setEvents(prevEvents =>
                prevEvents.map(event =>
                    event._id === eventId ? 
                    { ...event, attendees: [...event.attendees, newAttendee] } : event
                )
            );
        
            setAttendees(prevAttendees => [...prevAttendees, newAttendee]);
        });
    
        return () => {
            socketRef.current?.off("updateAttendees");
        };
    }, [events]);
    

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserId(decoded.userId);  
            } catch (err) {
                console.error("Error decoding token:", err);
            }
        }
    }, []);


    
    useEffect(() => {
    const fetchAttendees = async () => {
        try {
            const updatedEvents = await Promise.all(events.map(async (event) => {
                const response = await fetch(`http://localhost:5000/api/events/${event._id}/attendees`);
                if (!response.ok) return event;
                const attendees = await response.json();
                return { ...event, attendees };
            }));

            setEvents((prevEvents) => 
                prevEvents.map(e => 
                    updatedEvents.find(upd => upd._id === e._id) || e
                )
            );
        } catch (error) {
            console.error("Error fetching attendees:", error);
        }
    };

    if (events.length > 0) {
        fetchAttendees();
        const interval = setInterval(fetchAttendees, 5000);
        return () => clearInterval(interval);
    }
    }, [events.length]); 

    const fetchEvents = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/events/event");
            const data = await res.json();

            if (!Array.isArray(data)) {
                console.error("Fetched data is not an array:", data);
                setEvents([]);  
                return;
            }

            const sanitizedEvents = data.map(event => ({
                ...event,
                attendees: event.attendees ?? []
            }));

            setEvents(sanitizedEvents);
            setFilteredEvents(sanitizedEvents);
        } catch (err) {
            console.error("Error fetching events:", err);
            setEvents([]);
            setFilteredEvents([]);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        let filtered = [...events];

        if (category !== "all") {
            filtered = filtered.filter(event => event?.category === category);
        }

        if (date) {
            filtered = filtered.filter(event => event?.date === date);
        }

        setFilteredEvents(filtered);
    }, [category, date, events]);

    const handleJoin = async (eventId) => {
        console.log(eventId);
        try {
            const response = await fetch(`http://localhost:5000/api/events/${eventId}/join`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: userId.trim() }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to join event");
            }
    
            setEvents((prevEvents) =>
                prevEvents.map((event) =>
                    event._id === eventId
                        ? { ...event, attendees: [...event.attendees, { _id: userId, name: "You" }] }
                        : event
                )
            );
        } catch (err) {
            console.error("Error joining event:", err.message);
            alert(`Error: ${err.message}`);
        }
    };
    

    const handleLeave = async (eventId) => {
        try {
            const res = await fetch(`http://localhost:5000/api/events/${eventId}/leave`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId }),
            });

            if (res.ok) {
                setEvents(prevEvents =>
                    prevEvents.map(event =>
                        event._id === eventId
                            ? { ...event, attendees: event.attendees.filter(att => att._id !== userId) }
                            : event
                    )
                );
                
            }
        } catch (err) {
            console.error("Error leaving event:", err);
        }
    };

    return (
        <div className="dashboard-container">
            {/*<EventForm onEventAdded={fetchEvents} /> */}

            <div className="filter">
                <label>Category: </label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="all">All</option>
                    <option value="conference">Conference</option>
                    <option value="workshop">Workshop</option>
                    <option value="meetup">Meetup</option>
                </select>

                <label>Date: </label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <div className="main">
                {filteredEvents?.length > 0 ? (
                    filteredEvents.map(event => (
                        <div key={event?._id} className="event-card">
                            <h3>{event?.title}</h3>
                            <p>{event?.date} - {event?.category}</p>
                            <p>{event?.description}</p>

                            {event.attendees.some(att => att._id === userId) ? (
                                <button onClick={() => handleLeave(event._id)}>Leave</button>
                            ) : (
                            <button onClick={() => handleJoin(event._id)}>Join</button>
                            )}

                            <div>
                                <h2>Attendees ({event.attendees?.length || 0})</h2>
                                <ul>
                                {event.attendees.map((attendee) => (
                                    <li key={attendee._id}>{attendee.name}</li>
                                ))}
                                </ul>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No events found.</p>
                )}
            </div>
        </div>
    );
};

export default DashboardUI;
