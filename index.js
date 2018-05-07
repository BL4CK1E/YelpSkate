
// Require Middleware & Datebase
const express   =   require("express"),
      app       =   express();

// Require Routes Folder
require('./routes')(app, express);
