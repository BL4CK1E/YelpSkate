const mongoose = require('mongoose');
const Schema = mongoose.Schema,
      ObjectID = Schema.Types.ObjectId;

let eventSchema = new Schema({
    author: String,
    name: String,
    city: String,
    state: String,
    streetNumber: String,
    eventDate: String,
    category: String,
    overview: String,
    picture: String,
    comments: [
        {
          type: ObjectID, 
          ref: "Comment"
        }
      ] 
    });

Event = mongoose.model("Event", eventSchema);

exports.eventModel = Event;