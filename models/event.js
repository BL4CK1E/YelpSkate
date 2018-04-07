const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let eventSchema = new Schema({
    name: String,
    city: String,
    state: String,
    streetNumber: String,
    eventDate: String,
    shortOverview: String,
    picture: String
  });

Event = mongoose.model("Event", eventSchema);

exports.eventModel = Event;