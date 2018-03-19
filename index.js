// ------------//
//  Packages   //
// ------------//

const express = require("express"),
  app = express();
const request = require("request");
const path = require("path");

//-------------//
//   Servers   //
//-------------//

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

//-------------//
//     Data    //
//-------------//

var data = {
  url: "http://api.jsonbin.io/b/5aaf96abffba176106431d68/latest",
  headers: {
    "secret-key": "$2a$10$E7/AKiObcqEM6M4RJl6HeOL7iFL3Qc3eUJ1uNT2cL0D2njNI.8RcG"
  }
};

//------------//
//   Routes   //
//------------//

// Serve home page and all events
app.get("/", function(req, res) {
  request(data, function(error, response, body) {
    let parsedBody = JSON.parse(body);
    res.render("home", { db: parsedBody });
  });
});

// Serve individual event
app.get("/home/:parkid", function(req, res) {
  let parkID = req.params.parkid;

  request(data, function(error, response, body) {
    let parsedBody = JSON.parse(body);
    res.render("detailed", { db: parsedBody, pID: parkID });
  });
});

// Serve login page
app.get("/login", function(req, res) {
  res.render("login");
});

// Serve register page
app.get("/register", function(req, res) {
  res.render("register");
});

// Serve addEvent page
app.get("/addEvent", function(req, res) {
  res.render("addEvent");
});

//--------------//
//  Initialiser //
//--------------//

app.listen(3000, function() {
  console.log("The application is being served on http://localhost:3000");
});
