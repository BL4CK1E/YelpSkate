
// Require Middleware & Datebase
const express   =   require("express"),
      app       =   express();
const mongoose  =   require("./mongoose");

// Require Routes Folder
require('./routes')(app, express);
