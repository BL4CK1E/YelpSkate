// ------------//
//  Packages   //
// ------------//

const express = require("express"),
  app = express();
const request = require("request");

//-------------//
//   Servers   //
//-------------//

app.use(express.static("public"));
app.set("view engine", "ejs");

//-------------//
//     Data    //
//-------------//

//------------//
//   Routes   //
//------------//

// Serve landing page
app.get("/", function(req, res) {
  res.render("landingpage");
});

// Serve all events
app.get("/home", function(req, res) {
  let parkID = null;

  request("http://api.jsonbin.io/b/5aa97ecb7417a517644f6bc9", function(
    error,
    response,
    body
  ) {
    let parsedBody = JSON.parse(body);
    res.render("home", { db: parsedBody, parkID: parkID });
  });
});

// Serve individual event
app.get("/home/:parkid", function(req, res) {
  let parkID = req.params.parkid;

  request("http://api.jsonbin.io/b/5aa97ecb7417a517644f6bc9", function(
    error,
    response,
    body
  ) {
    let parsedBody = JSON.parse(body);
    console.log(parkID);
    res.render("home", { db: parsedBody, parkID: parkID });
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
