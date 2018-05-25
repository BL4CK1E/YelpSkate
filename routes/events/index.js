const bodyParser    = require("body-parser"),
      models        = require("../../models/"),
      isLoggedIn   =   require("../users/auth").isLoggedIn;

module.exports      = function(app, express) {



  // Pass form data
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));



  // Find Event(s)
  app.get("/search", function(req,res) {

    let searchParam = {};
    let options = 10;

    let name = req.query.name;
    let category = req.query.category;
    let limit = parseInt(req.query.limit);

    if (name) { searchParam.name = {$regex:name} };
    if (category) { searchParam.category = category };
    if (limit) {options = limit};

    models.eventModel.find(searchParam).limit(options)
    .then(function(event){
      res.render("index",{db: event, page: "/search"});
    })
    .catch((err)=>{
      console.log(err);
    })

  })



  // Show Individual Event
  app.get("/event/:id", isLoggedIn, function(req, res) {

    let id = req.params.id;

    models.eventModel.findOne({ _id: id }).populate("comments").exec(function(err, event){
      if (err) {
        console.log(err);
      } else {
        res.send(event);
      }
    });

  });



  // Add Event
  app.get("/event/add", isLoggedIn, function(req, res) {

    res.render("addEvent",{user: req.user});

  });



  // Submit New Event
  app.post("/event/add", isLoggedIn, function(req, res) {

    req.body.author = req.user.username;

    models.eventModel.create(req.body, function(err, event) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/view/" + event._id);
      }
    });

  });



  // Edit Event
  app.get("/event/edit/:id", isLoggedIn, function(req, res) {

    let id = req.params.id;

    models.eventModel.findOne({ _id: id }, function(err, event) {
      if(req.user.username !== event.author) {
        console.log('---> "' + req.user.username + '" is not authorised to edit "' + id + '"!');
        return res.redirect("/view/"+event._id);
      } 
        if (err) {
          console.log(err);
        }
        res.render("editEvent", {db: event});
    });

  });



  // Submit Edited Changes
  app.post("/event/edit/:id", isLoggedIn, function(req, res) {

    let id = req.params.id;

    if(req.user.username !== req.body.author) {
      console.log('---> "' + req.user.username + '" is not authorised to edit "' + id + '"!');
      return res.redirect("/view/"+id);
    };

    models.eventModel.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      function(err, doc) {
        if (err) {
          console.log(err);
        }
        console.log("---> Made changes to:'" + id + "' to the database!");
        res.redirect("/view/"+doc._id);
      }
    );

  });



  // Remove Event Route
  app.delete("/event/delete/:id", isLoggedIn, function(req, res) {

    let id = req.params.id;

    models.eventModel.findOne({_id: id })
    .then((event)=>{
      if(req.user.username !== event.author) {
        console.log('---> "' + req.user.username + '" is not authorised to remove "' + id + '" from the database!');
        return res.redirect("/view/"+event._id);
      } else {
        console.log('---> Removed ID: "' + id + '" from the database!');
        res.redirect("/")
        return models.eventModel.remove({ _id: id }).exec();
      }
    })
    .catch((err)=>{
      console.log(err);
    })

  });



  // Comment Module
  require('./comments')(app);
  


};
