var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username:String,
    password:String
})

userSchema.plugin(passportLocalMongoose); // .plugin imports all methods of passport

var User = mongoose.model("User",userSchema);
module.exports = User;