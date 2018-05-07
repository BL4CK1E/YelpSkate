// const express       =   require('express');
const path          =   require('path'),
      passport      =   require("passport"),
      localStrategy =   require("passport-local"),
      models        =   require("../models/"),
      user          =   models.userModel,
      bin           =   require("../bin/seed"),
      isLoggedIn    =   require("./users/auth").isLoggedIn;

module.exports  =   function(app,express) {

    // Static Server (CSS/JS/IMG Files)
    app.use(express.static('public'));
    app.set("view engine", "ejs");

    // Passport Configuration
    require('./users/auth')(app);

    // Serve Home Page
    app.get("/", isLoggedIn, function(req, res) {
        models.eventModel.find({})
        .then((event)=>{
            res.render("home", {db: event});
        })
        .catch((err)=>{
            console.log(err);
        })
    });

    // Start Server
    app.listen(3000, function() {
        bin.seed();
        console.log("The application has started at: http://localhost:3000");
    });

    // Require additional routes
    require('./events')(app);
    require('./users')(app);

}