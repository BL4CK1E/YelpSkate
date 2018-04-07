

// Middleware & Datebase
const express = require("express"),
  app = express();
const mongoose = require("./mongoose");

// Routes Folder
require('./routes')(app, express);
