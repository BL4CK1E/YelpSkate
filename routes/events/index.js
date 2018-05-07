const bodyParser    = require("body-parser"),
      models        = require("../../models/"),
      isLoggedIn   =   require("../users/auth").isLoggedIn;

module.exports      = function(app, express) {

  // Pass form data
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Show Individual Event
  app.get("/view/:parkid", isLoggedIn, function(req, res) {
    let parkID = req.params.parkid;
    models.eventModel.findOne({ _id: parkID }).populate("comments").exec(function(err, event){
      if (err) {
        console.log(err);
      } else {
        res.render("detailed",{db: event});
      }
    });
  });

  // Add Event
  app.get("/add", isLoggedIn, function(req, res) {
    res.render("addEvent",{user: req.user});
  });

  // Submit New Event
  app.post("/add/submit", isLoggedIn, function(req, res) {
    req.body.author = req.user.username;
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
  app.get("/edit/:pid", isLoggedIn, function(req, res) {
    let pID = req.params.pid;
    models.eventModel.findOne({ _id: pID }, function(err, event) {
      if(req.user.username !== event.author) {
        console.log('---> "' + req.user.username + '" is not authorised to edit "' + pID + '"!');
        return res.redirect("/view/"+event._id);
      } 
        if (err) {
          console.log(err);
        }
        res.render("editEvent", {db: event});
    });


  });

  // Submit Edited Changes
  app.post("/edit/submit/:pid", isLoggedIn, function(req, res) {
    let pID = req.params.pid;
    console.log(req.body)
    if(req.user.username !== req.body.author) {
      console.log('---> "' + req.user.username + '" is not authorised to edit "' + pID + '"!');
      return res.redirect("/view/"+pID);
    };
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
  app.get("/delete/:pid", isLoggedIn, function(req, res) {

    let pID = req.params.pid;
    models.eventModel.findOne({_id: pID })
    .then((event)=>{
      if(req.user.username !== event.author) {
        console.log('---> "' + req.user.username + '" is not authorised to remove "' + pID + '" from the database!');
        return res.redirect("/view/"+event._id);
      } else {
        console.log('---> Removed ID: "' + pID + '" from the database!');
        res.redirect("/")
        return models.eventModel.remove({ _id: pID }).exec();
      }
    })
    .catch((err)=>{
      console.log(err);
    })

  });

  require('./comments')(app);
  
};
