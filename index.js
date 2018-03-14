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

app.get("/", function(req, res) {
  res.render("landingpage");
});

app.get("/home/", function(req, res) {
  request("http://api.jsonbin.io/b/5aa97ecb7417a517644f6bc9", function(
    error,
    response,
    body
  ) {
    let parsedBody = JSON.parse(body);
    res.render("home", { db: parsedBody });
  });
});

//--------------//
//  Initialiser //
//--------------//

app.listen(3000, function() {
  console.log("The application is being served on http://localhost:3000");
});
