require("dotenv").config();

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys.js");
const User = require("../models/user-model.js");
const nodemailer = require("nodemailer");

passport.serializeUser((user,done)=>{
      done(null,user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
  new GoogleStrategy({
    callbackURL : "/auth/google/redirect",
    clientID : keys.google.clientID,
    clientSecret :keys.google.clientSecret
},(accessToken, refreshToken, profile, done)=>{
     console.log(profile);
 User.findOne({googleId:profile.id}).then((currentUser)=>{
    if(currentUser){
      console.log("existing user " + currentUser.username);
      done(null,currentUser);
    }else{
      new User({
        username : profile.displayName,
        googleId : profile.id,
        thumbnail: profile._json.picture,
      }).save().then((newUser)=>{
        let transporter = nodemailer.createTransport({
          service:"gmail",
          auth:{
             user:process.env.email,
             pass:process.env.pass
          }
        });

        let mailOptions = {
          from:"pinisettilalithsrinivas@gmail.com",
          to: "hemanthkumar7909@gmail.com",
          subject:"Testing nodemailer",
          text:"this is a testing of nodemailer"
        }

        transporter.sendMail(mailOptions,()=>{
            if(err){
              console.log("error occured");
            }else{
              console.log("email sent");
            }
        });

        console.log("new user created " + newUser.username);
        done(null,newUser);
      })
    }
 });

})
);
