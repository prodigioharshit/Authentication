var express = require('express'),
    mongoose = require('mongoose'),
    app = express();
     
mongoose.connect("mongodb://localhost/Secret_Page");

var SecretPageschema = new mongoose.Schema({
    
})
    
var Secret = mongoose.model("secret",SecretPageschema);

app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("home");
});

app.get("/secret",function(req,res){
    res.render("secret");
});
    



app.listen(3000,function(req,res){
    console.log("Secret Page server started");
})