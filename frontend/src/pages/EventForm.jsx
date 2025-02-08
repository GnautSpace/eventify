import { useState } from "react";
import "../styles/EventForm.css";

const EventForm = ({ onEventAdded }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("conference");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !date || !category) {
            setError("All fields are required!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/events/event", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description, date, category }),
            });

            if (!response.ok) throw new Error("Failed to add event!");

            const newEvent = await response.json();
            onEventAdded(newEvent); 
            setTitle("");
            setDescription("");
            setDate("");
            setCategory("conference");
            setError("");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="event-form">
            <h2>Create Event</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Event Name" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="conference">Conference</option>
                    <option value="workshop">Workshop</option>
                    <option value="meetup">Meetup</option>
                </select>
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default EventForm;
