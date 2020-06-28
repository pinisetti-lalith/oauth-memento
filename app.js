const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const authRoutes = require("./routes/auth-routes.js");
const profileRoutes = require("./routes/profile-routes.js");
const passportSetup = require("./config/passport-setup.js");
const mongoose = require("mongoose");
const keys = require("./config/keys.js");


const app  = express();

app.set("view engine","ejs");

app.use(cookieSession({
  maxAge: 24 * 60 * 60 *1000,
  keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost/oauth", { useNewUrlParser: true , useUnifiedTopology: true},()=>{
  console.log("connected to mongodb localhost database");
});


app.use("/auth",authRoutes);
app.use("/profile",profileRoutes);

app.get("/",(req,res)=>{
  res.render("home",{ username : req.user});
});

app.get("/about",(req,res)=>{
  res.render("about");
})

app.get("/contact",(req,res)=>{
  res.render("contact");
})

app.listen(4000,()=> {
  console.log("Server running a PORT 4000");
});
