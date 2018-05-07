const bodyParser   =   require("body-parser"),
      models       =   require("../../../models/"),
      isLoggedIn   =   require("../../users/auth").isLoggedIn;
      

module.exports     =   function(app, express) {

    app.post('/comment/:pid', isLoggedIn, function(req,res){
        let pID        =   req.params.pid;
        let comment    =   req.body;
        comment.author =   req.user.username;

        models.commentModel.create(comment)
        .then((comment)=>{
            return models.eventModel.findOneAndUpdate({_id:pID},{ $push: { comments: comment }}, { upsert: true });
        })
        .then((event)=>{
            console.log("---> Made changes to:'" + event.id + "' to the database!");
            res.redirect("/view/"+event.id);
        })
        .catch((err)=>{
            console.log(err);
        })

    });

};