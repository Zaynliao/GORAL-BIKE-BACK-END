const express = require('express');
const router = express.Router();
const pool = require('../utils/db'); // 引入 db
const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/api/social/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const user = {
        email: profile.emails[0].value,
        name: profile.displayName,
        id: profile.id,
        provider: profile.provider,
      };
      // found user -> done(null,user)
      // let sql = "SELECT * FROM user WHERE email = ?";
      // const [searchEmail] = await pool.execute(sql, [user.email]),
      //   hasCreated = searchEmail.length > 0;
      // if (!hasCreated) {
      //   // not found -> create user -> done(null,user)
      //   sql =
      //     "INSERT INTO user (email, password, full_name,id) VALUES (?, ?, ?, ?)";
      //   await pool.execute(sql, [user.email, uuidv4(), user.name, user.id]);
      // }

      done(null, user); // 設定 session
    }
  )
)
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
// http://localhost:3001/api/social/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    // Successful authentication, redirect home.
    res.send({
      status: true,
      data: {
        id: req.user.id,
        name: req.user.displayName
      }
    });
    // res.redirect("http://localhost:3000/");
  }
);


module.exports = router;