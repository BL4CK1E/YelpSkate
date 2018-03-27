// ------------//
//  Packages   //
// ------------//

const express = require("express"),
  app = express();
const bodyParser = require("body-parser");
const request = require("request");
const mongoose = require("mongoose");
const path = require("path");
const $ = require("jQuery");

//-------------------//
//   Static Serves   //
//-------------------//

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

//---------------------------//
//     Database Connector    //
//---------------------------//

const dbuser = "evntr_db";
const dbpass = "talke123";

mongoose.connect(
  "mongodb://" + dbuser + ":" + dbpass + "@ds125469.mlab.com:25469/evntr"
);

//------------------------//
//    Database Schemas    //
//------------------------//

let eventSchema = new mongoose.Schema({
  name: String,
  city: String,
  state: String,
  streetNumber: String,
  eventDate: String,
  shortOverview: String,
  picture: String
});

let Event = mongoose.model("Event", eventSchema);

// Event.create(
//   {
//     name: "Bowlarama",
//     city: "Sydney",
//     state: "NSW",
//     streetNumber: "Bondi",
//     eventDate: "25th Apr 2018",
//     shortOverview:
//       "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum ",
//     picture:
//       "https://skateboarding.transworld.net/wp-content/blogs.dir/440/files/2012/02/Vans-Bowl-Artwork-_FINAL-424x600.jpg"
//   },
// function(err, event) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(event);
//   }
// }
// );
let name = "Harbour";
Event.find({ city: { $regex: name } }, function(err, event) {
  if (err) {
    console.log(err);
  } else {
    console.log(event);
  }
});

//------------------//
//     Form Data    //
//------------------//

// This parses all form data, which can then be accesed via 'apt.post' routes
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

//------------//
//   Routes   //
//------------//

// Serve home page and all events, this is the home page and will serve all event data
app.get("/", function(req, res) {
  res.render("home", {
    db: parsedBody
  });
});

// Serve individual event, this will serve detailed data about a selected event
app.get("/view/:parkid", function(req, res) {
  let parkID = req.params.parkid;
  res.render("detailed", {
    db: parsedBody,
    pID: parkID
  });
});

// Serve login page, this will allow a user to login or auth to the app
app.get("/login", function(req, res) {
  res.render("login");
});

// Serve register page, this page will allow a user to register to the app
app.get("/register", function(req, res) {
  res.render("register");
});

// Serve addEvent page, this page will allow a user to input a new event
app.get("/add", function(req, res) {
  res.render("addEvent");
});

// Serve addEvent page
app.post("/add/submit", function(req, res) {
  //Push New Object
  parsedBody.events.push(req.body);
  let formData = JSON.stringify(parsedBody);

  // Send a put request to JSON Bin
  request.put(
    {
      url: "https://api.jsonbin.io/b/5ab0a71c5d1dee610789018d",
      headers: {
        "secret-key":
          "$2a$10$E7/AKiObcqEM6M4RJl6HeOL7iFL3Qc3eUJ1uNT2cL0D2njNI.8RcG",
        "Content-type": "application/json"
      },
      body: formData
    },
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error("upload failed:", err);
      }
      console.log("Post completed, event added!");
    }
  );

  res.redirect("/");
});

// Remove Event Route
app.get("/delete/:pid", function(req, res) {
  let pID = req.params.pid;

  // If first of array, delete otherwhise splice the object
  if (pID < 1) {
    parsedBody.events.shift();
    console.log(parsedBody.events);
  } else {
    parsedBody.events.splice(pID, pID++);
  }
  let formData = JSON.stringify(parsedBody);

  // Send new data to JSON Bin
  request.put(
    {
      url: "https://api.jsonbin.io/b/5ab0a71c5d1dee610789018d",
      headers: {
        "secret-key":
          "$2a$10$E7/AKiObcqEM6M4RJl6HeOL7iFL3Qc3eUJ1uNT2cL0D2njNI.8RcG",
        "Content-type": "application/json"
      },
      body: formData
    },
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error("upload failed:", err);
      }
      console.log("Post completed, event removed!");
    }
  );

  // Send user back to the home page
  res.redirect("/");
});

// Catch All
app.get("*", function(req, res) {
  res.redirect("/");
});

//--------------//
//  Initialiser //
//--------------//

app.listen(3000, function() {
  console.log("The application has started at: http://localhost:3000");
});
