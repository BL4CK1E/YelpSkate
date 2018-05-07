const bodyParser   =   require("body-parser");
const models       =   require("../../../models/");

module.exports     =   function(app, express) {

    app.post('/comment/:pid', function(req,res){
        let pID       =   req.params.pid;
        let comment   =   req.body;

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