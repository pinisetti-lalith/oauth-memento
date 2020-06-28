const router = require("express").Router();
const passport = require("passport");
const user = require("../models/user-model.js");

router.get("/login",(req,res)=>{
  res.render("login",{user: req.user});
});

router.get("/logout",(req,res)=>{
   req.logout();
   res.redirect("/");
});

router.post("/register",(req,res)=>{
      console.log(req.body.mail );
});

router.get("/google",passport.authenticate("google",{
  scope:["profile"]
}));

router.get("/google/redirect",passport.authenticate("google"),(req,res)=>{
   res.redirect("/profile");

})


module.exports = router;
