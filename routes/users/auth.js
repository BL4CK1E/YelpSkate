const passport = require("passport"),
  localStrategy = require("passport-local"),
  models = require("../../models/"),
  user = models.userModel;

module.exports = function(app) {

  // Passport Configuration
  app.use(
    require("express-session")({
      secret: "Event$ Are AmaZing!",
      resave: false,
      saveUninitialized: false
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new localStrategy(user.authenticate()));
  passport.serializeUser(user.serializeUser());
  passport.deserializeUser(user.deserializeUser());

  app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
  });

};

module.exports.isLoggedIn = function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};
