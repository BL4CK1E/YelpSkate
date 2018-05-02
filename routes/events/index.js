const bodyParser = require("body-parser");
const models = require("../../models/");

module.exports = function(app, express) {
  // Pass form data
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Show Individual Event
  app.get("/view/:parkid", function(req, res) {
    let parkID = req.params.parkid;
    models.eventModel.findOne({ _id: parkID }).populate("comments").exec(function(err, event){
      if (err) {
        console.log(err);
      } else {
        res.render("detailed", {
          db: event
        });
      }
    });
  });

  // Add Event
  app.get("/add", function(req, res) {
    res.render("addEvent");
  });

  // Submit New Event
  app.post("/add/submit", function(req, res) {
    models.eventModel.create(req.body, function(err, event) {
      if (err) {
        console.log(err);
      } else {
        console.log(
          "---> Added Event:'" + req.body.name + "' to the database!"
        );
        res.redirect("/view/"+event._id);
      }
    });
  });

  // Edit Event
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

  // Submit Edited Changes
  app.post("/edit/submit/:pid", function(req, res) {
    let pID = req.params.pid;

    models.eventModel.findOneAndUpdate(
      { _id: pID },
      { $set: req.body },
      function(err, doc) {
        if (err) {
          console.log(err);
        }
        console.log("---> Made changes to:'" + pID + "' to the database!");
        res.redirect("/view/"+doc._id);
      }
    );
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

  require('./comments')(app);
  
};
