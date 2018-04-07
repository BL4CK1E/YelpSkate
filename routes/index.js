const express = require('express');
const path = require('path');
const models = require("../models/");

module.exports = function(app) {

    // Static Serves
    app.use(express.static('public'));
    app.set("view engine", "ejs");

    // Serve home page and all events, this is the home page and will serve all event data
    app.get("/", function(req, res) {

        models.eventModel.find({}, function(err, event) {
            if (err) {
                console.log(err);
            } else {
                res.render("home", {
                db: event
            });

            };
        });    

    });

    app.listen(3000, function() {
        console.log("The application has started at: http://localhost:3000");
    });

    require('./events')(app);
    require('./users')(app);

}