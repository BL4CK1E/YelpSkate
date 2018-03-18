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

data = "http://api.jsonbin.io/b/5aae3d57aba566611f331b06/2";

//------------//
//   Routes   //
//------------//

// Serve landing page
app.get("/", function(req, res) {
  res.redirect("/home");
});

// Serve all events
app.get("/home", function(req, res) {
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
    res.render("detailed", { db: parsedBody });
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

//--------------//
//  Initialiser //
//--------------//

app.listen(3000, function() {
  console.log("The application is being served on http://localhost:3000");
});
