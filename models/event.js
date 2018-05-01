const mongoose = require('mongoose');
const Schema = mongoose.Schema,
      ObjectID = Schema.Types.ObjectId;

let eventSchema = new Schema({
    name: String,
    city: String,
    state: String,
    streetNumber: String,
    eventDate: String,
    shortOverview: String,
    picture: String,
    comments: [{
      _id: ObjectID, 
      user: String,
      comment: String
    }] 
  });

Event = mongoose.model("Event", eventSchema);

exports.eventModel = Event;