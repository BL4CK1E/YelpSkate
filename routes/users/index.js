const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const models = require("../../models/");

module.exports = function(app) {

    // Register
    app.get("/register", function(req, res) {
        res.render("register");   
    });

    // Login
    app.get("/login", function(req, res) {
        res.render("login");   
    });

    //Logout
    app.get("/logout", function(req, res) {
        res.render("index");   
    });
    

}