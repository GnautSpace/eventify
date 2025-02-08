const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    date: String,
    attendees: [{ type: [mongoose.Schema.Types.ObjectId], ref: "User" , default: []}]
    
});



const Event= mongoose.model('Event', eventSchema);

module.exports = Event;
