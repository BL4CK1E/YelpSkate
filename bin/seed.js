const fake = require("faker");
const db = require("../mongoose");
const models = require("../models/index");
const seed = (module.exports = {});

let eventData = [];
let category = ["concerts","sports","theaters","parties","communities","classes"];
let date = ["28th May 2018", "4th Jun 2018", "6th Aug 2018", "28th Dec 2018", "13th Jan 2019"];

for (let i = 0; i < 300; i++) {

  let r = Math.floor((Math.random()*category.length));
  let d = Math.floor((Math.random()*date.length));

  let obj = {
    name: fake.random.word(),
    city: fake.address.city(),
    state: fake.address.stateAbbr(),
    streetNumber: fake.address.streetAddress(),
    eventDate: date[d],
    category: category[r],
    shortOverview: fake.lorem.paragraph(),
    picture:
      "https://source.unsplash.com/1600x900/?"+category[r],
    comments: [],
    author: fake.name.findName()
  };
  eventData.push(obj);
}

let commentData = {
  author: fake.name.findName(),
  comment: fake.lorem.paragraph()
};

seed.seed = function seed() {

  models.eventModel.remove({}, function(err) {
    // console.log("---> Event Collection Emptied");
  });
  models.commentModel.remove({}, function(err) {
    // console.log("---> Comment Collection Emptied");
  });

  eventData.forEach(function(eventData) {
    models.eventModel
      .create(eventData)
      .then(function(data) {
        event = data;
        // console.log("---> Saved Event: " + event.name);
        return event;
      })
      .then(async function(event) {
        await models.commentModel.create(commentData, function(err, comment) {
          event.comments.push(comment);
          // console.log(
          //   "---> Created Comment & added this to Event: " + event.name
          // );
          event.save();
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  });
  
};