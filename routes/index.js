const express = require('express');
const path = require('path');
const models = require("../models/");
const bin = require("../bin/seed");

module.exports = function(app) {

    // Static Server (CSS/JS/IMG Files)
    app.use(express.static('public'));
    app.set("view engine", "ejs");

    // Serve Home Page
    app.get("/", function(req, res) {

        models.eventModel.find({}, function(err,event){
            if (err) {
                console.log(err);
            } else {
                res.render("home", {db: event});
            };
        });    

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