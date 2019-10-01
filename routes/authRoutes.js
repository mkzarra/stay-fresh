const passport = require('passport');
const mongoose = require('mongoose');
const cron = require('node-cron');

const User = mongoose.model('users');
const Pantry = mongoose.model('pantries');

const Mailer = require('../services/Mailer');
const pantryTemplate = require('../services/templates/pantryEmail');

module.exports = (app) => {
  app.get( '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get( '/auth/google/callback',
    passport.authenticate('google'), (req, res) => {
      try {
        res.redirect('/');
      } catch(error) {
        console.error("\n\n\n" + error + "\n\n\n");
      }
    });

  app.get('/api/logout', (req, res) => {
      req.logout();
      res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  // app.get('api/users', async (req, res) => {
  //   try {
  //     const users = await User.find();
  //     res.status(200).json({ users });

  //     const pantries = users.map(user =>
  //       app.get('api/pantry', async (request, response) => {
  //         try {
  //           const pantry = await Pantry.find({ _user: user._id });
  //           response.status(200).json(pantry);
  //           return { ...user, pantry }
  //         } catch (error) {
  //           console.log(error);
  //           response.status(200).send(error);
  //         }
  //     }));

  //     const mailers = pantries.forEach(doc =>
  //       new Mailer(doc.user, doc.pantry.map(item => pantryTemplate(item))));
      
  //     cron.schedule('* * * * *', function() {
  //       mailers.forEach(mailer => mailer.send());
  //     }, {
  //       scheduled: true,
  //       timezone: "America/New_York"
  //     }).start();
  //   } catch(error) {
  //     console.log(error);
  //     res.status(403).send(error);
  //   }
  // });
};