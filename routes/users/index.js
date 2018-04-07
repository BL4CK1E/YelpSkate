const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const models = require("../../models/");

module.exports = function(app) {

    app.get("/login", function(req, res) {
        res.render("login");   
    });

    app.get("/register", function(req, res) {
        res.render("register");   
    });

}