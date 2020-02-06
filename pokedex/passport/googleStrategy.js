const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then(found => {
          if (found) {
            done(null, found);
          } else {
            return User.create({
              googleId: profile.id,
              displayName: profile.displayName
            }).then(created => {
              done(null, created);
            });
          }
        })
        .catch(err => {
          done(err);
        });
    }
  )
);
