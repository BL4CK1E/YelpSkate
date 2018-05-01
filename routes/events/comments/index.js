const bodyParser = require("body-parser");
const models = require("../../../models/");

module.exports = function(app, express) {

    // Pass form data
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.post('/comment/submit/:pid', function(req,res){
        let pID = req.params.pid;
        comment = req.body;
        comment.user = "Admin";
        models.eventModel.findOneAndUpdate({_id: pID}, {$push: {comments: comment}},function(err, doc) {
            if (err) {
              console.log(err);
            }
            console.log("---> Made changes to:'" + pID + "' to the database!");
            res.redirect("/view/"+pID);
          });
    });

};