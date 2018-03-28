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
  Event.find({}, function(err, event) {
    if (err) {
      console.log(err);
    } else {
      res.render("home", {
        db: event
      });
    }
  });
});

// Serve individual event, this will serve detailed data about a selected event
app.get("/view/:parkid", function(req, res) {
  let parkID = req.params.parkid;

  Event.findOne({ _id: parkID }, function(err, event) {
    if (err) {
      console.log(err);
    } else {
      res.render("detailed", {
        db: event
      });
    }
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
  Event.create(req.body, function(err, event) {
    if (err) {
      console.log(err);
    } else {
      console.log("---> Added Event:'" + req.body.name + "' to the database!");
      res.redirect("/");
    }
  });
});

// Serve editEvent page
app.get("/edit/:pid", function(req, res) {
  let pID = req.params.pid;

  Event.findOne({ _id: pID }, function(err, event) {
    if (err) {
      console.log(err);
    } else {
      res.render("editEvent", {
        db: event
      });
    }
  });
});

app.post("/edit/submit/:pid", function(req, res) {
  let pID = req.params.pid;

  Event.findOne({ _id: pID }, function(err, event) {
    if (err) {
      console.log(err);
    } else {
      event.set(req.body);
      event.save(function(err, updatedEvent) {
        if (err) {
          console.log(err);
        } else {
          console.log("---> Made changes to:'" + pID + "' to the database!");
        }
      });
      res.redirect("/");
    }
  });
});

// Remove Event Route
app.get("/delete/:pid", function(req, res) {
  let pID = req.params.pid;

  Event.remove({ _id: pID }, function(err, event) {
    if (err) {
      console.log(err);
    } else {
      console.log('---> Removed ID: "' + pID + '" from the database!');
      res.redirect("/");
    }
  });
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
