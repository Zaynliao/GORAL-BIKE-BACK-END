const express = require('express');
const router = express.Router();
const pool = require('../utils/db'); // 引入 db
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3001/api/social/google/callback',
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      try {
        console.log('profile', profile);
        const user = {
          email: profile.emails[0].value,
          name: profile.displayName,
          accessToken,
        };
        const [currentUser] = await pool.execute(
          'SELECT * FROM users WHERE email = ?',
          [user.email]
        );
        console.log(user);
        if (currentUser.length > 0) {
          return cb(null, user);
        }
        // not found -> create user -> done(null,user)
        await pool.execute(
          `INSERT INTO users (email, name, password, googleId) VALUES (?, ?, ?, ?)`,
          [user.email, user.name, 'socialMedia', profile.id]
        );
        return cb(null, user);
      } catch (error) {
        console.log(error);
      }
    }
  )
);
// http://localhost:3001/api/social/google
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
// http://localhost:3001/api/social/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/api/social/check',
  }),
  async (req, res) => {
    console.log('req', req.user);
    const [currentUser] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [req.user.email]
    );
    let returnUser = {
      user_id: currentUser[0].user_id,
      name: currentUser[0].name,
      email: currentUser[0].email,
      phone: currentUser[0].phone,
      photo: currentUser[0].photo,
    };
    req.session.user = returnUser;
    console.log(req.session);

    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000/');
  }
);

// http://localhost:3001/api/social/check
router.get('/check', (req, res) => {
  console.log('in /social/check', req.session);
  res.send(req.session.user);
});

module.exports = router;
