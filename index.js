// ------------//
//  Packages   //
// ------------//

const express = require("express"),
  app = express();
const bodyParser = require("body-parser");
const request = require("request");
const path = require("path");
const $ = require("jQuery");

//-------------------//
//   Static Serves   //
//-------------------//

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

//---------------------//
//   Cust. Functions   //
//---------------------//

function buildObj(obj1, obj2) {
  obj1 = '"' + obj1.toString() + '":';
  obj2 = JSON.stringify(obj2);
  builtObj = "{" + obj1 + obj2 + "}";
}

//-------------//
//     Data    //
//-------------//

// This requests data from our temp database and allows us to auth
let data = {
  url: "http://api.jsonbin.io/b/5aaf96abffba176106431d68/latest",
  headers: {
    "secret-key": "$2a$10$E7/AKiObcqEM6M4RJl6HeOL7iFL3Qc3eUJ1uNT2cL0D2njNI.8RcG"
  }
};


request(data, function (error, response, body) {
  parsedBody = JSON.parse(body);
});

// This parses all form data, which can then be accesed via 'apt.post' routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//------------//
//   Routes   //
//------------//

// Serve home page and all events, this is the home page and will serve all event data
app.get("/", function (req, res) {
  res.render("home", {
    db: parsedBody
  });
});

// Serve individual event, this will serve detailed data about a selected event
app.get("/home/:parkid", function (req, res) {
  let parkID = req.params.parkid;
  res.render("detailed", {
    db: parsedBody,
    pID: parkID
  });
});

// Serve login page, this will allow a user to login or auth to the app
app.get("/login", function (req, res) {
  res.render("login");
});

// Serve register page, this page will allow a user to register to the app
app.get("/register", function (req, res) {
  res.render("register");
});

// Serve addEvent page, this page will allow a user to input a new event
app.get("/addEvent", function (req, res) {
  res.render("addEvent");
});

// --------------//
//   POST/PUT   //
// --------------//

// Serve addEvent page
app.post("/addEvent/submit", function (req, res) {

  // Produce a new ID for the JSON Object
  let newNum = Object.keys(parsedBody.events).length + 1;

  // Pass in the new JSON Object & turn to string
  parsedBody.events[newNum] = req.body;
  let formData = JSON.stringify(parsedBody);

  // Send a put request to JSON Bin
  request.put({
      url: "http://api.jsonbin.io/b/5aaf96abffba176106431d68",
      headers: {
        "secret-key": '$2a$10$E7/AKiObcqEM6M4RJl6HeOL7iFL3Qc3eUJ1uNT2cL0D2njNI.8RcG',
        "Content-type": 'application/json'
      },
      body: formData,
    },
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      console.log('Post Completed, Event: \"' + parsedBody.events[newNum].name + '\" has been posted to the DB!');
    });

  res.redirect("/");

});

//--------------//
//  Initialiser //
//--------------//

app.listen(3000, function () {
  console.log("The application is being served on http://localhost:3000");
});