var express                   = require('express'),
    mongoose                  = require('mongoose'),
    passport                  = require('passport'),
    bodyParser                = require('body-parser'),
    User                      = require('./models/user'),
    LocalStrategy             = require('passport-local'),
    passportLocalMongoose     = require('passport-local-mongoose'),
    app                       = express();
     
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/Secret_Page");

app.use(require('express-session')({
    secret:"Never make promises when you are happy", //to encode and decode sessions
    resave:false,
    saveUninitialized:false
}));

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser()); //to encode sessions
passport.deserializeUser(User.deserializeUser()); //to decode sessions

//=================================================================================================================
//ROUTES
//=================================================================================================================


app.get("/",function(req,res){
    res.render("home");
});

app.get("/secret",function(req,res){
    res.render("secret");
});
    
//AUTH ROUTES

//show sign up form
app.get("/register",function(req,res){
   res.render("register"); 
});

//handling user sign in
app.post("/register",function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    
    //be careful new thing coming
    User.register(new User({username:username}),password,function(err,user){
        if(err){
           console.log(err);
           return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/secret");
        })
    });
});


app.listen(3000,function(req,res){
    console.log("Secret Page server started");
})