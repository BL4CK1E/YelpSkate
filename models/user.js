const mongoose                =   require('mongoose'),
      passportLocalMongoose   =   require('passport-local-mongoose'),
      Schema                  =   mongoose.Schema,
      ObjectID                =   Schema.Types.ObjectId;

let userSchema   =   new Schema({
        username: String,
        password: String,
        image: String
    });

userSchema.plugin(passportLocalMongoose);

User = mongoose.model("User", userSchema);

exports.userModel = User;