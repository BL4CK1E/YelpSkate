// const express = require('express');
const bodyParser = require("body-parser");
const models = require("../../models/");

module.exports = function(app,express) {

    // This parses all form data, which can then be accesed via 'apt.post' routes
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    // Serve individual event, this will serve detailed data about a selected event
    app.get("/view/:parkid", function(req, res) {

        let parkID = req.params.parkid;
        models.eventModel.findOne({ _id: parkID }, function(err, event) {
        if (err) {
            console.log(err);
        } else {
            res.render("detailed", {
            db: event
            });
        }
        });
    });

    // Serve addEvent page, this page will allow a user to input a new event
    app.get("/add", function(req, res) {

        res.render("addEvent");

    });
    
    // Serve addEvent page
    app.post("/add/submit", function(req, res) {

        models.eventModel.create(req.body, function(err, event) {
        if (err) {
            console.log(err);
        } else {
            console.log("---> Added Event:'" + req.body.name + "' to the database!");
            res.redirect("/");
        }
        });

    });
    
    // Serve editEvent page
    app.get("/edit/:pid", function(req, res) {

        let pID = req.params.pid;
        models.eventModel.findOne({ _id: pID }, function(err, event) {
        if (err) {
            console.log(err);
        } else {
            res.render("editEvent", {
            db: event
            });
        }
        });

    });
    
    app.post("/edit/submit/:pid", function(req, res) {

        let pID = req.params.pid;
        models.eventModel.findOne({ _id: pID }, function(err, event) {
            if (err) {
                console.log(err);
            } else {
                event.set(req.body);
                event.save(function(err, updatedEvent) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("---> Made changes to:'" + pID + "' to the database!");
                }
                });
                res.redirect("/");
            }
        });

    });
    
    // Remove Event Route
    app.get("/delete/:pid", function(req, res) {

        let pID = req.params.pid;
        models.eventModel.remove({ _id: pID }, function(err, event) {
            if (err) {
                console.log(err);
            } else {
                console.log('---> Removed ID: "' + pID + '" from the database!');
                res.redirect("/");
            }
        });
        
    });    

}