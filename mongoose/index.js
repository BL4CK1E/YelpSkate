const mongoose = require('mongoose');

const dbuser = "evntr_db";
const dbpass = "talke123";

mongoose.connect(
  //"mongodb://" + dbuser + ":" + dbpass + "@ds125469.mlab.com:25469/evntr"
  "mongodb://localhost:27017/evntr"
);