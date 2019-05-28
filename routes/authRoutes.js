const passport = require('passport');

module.exports = (app) => {
  console.log(passport);
  console.log(passport.strategies);
  console.log('oh heyeeyeyey')
  app.get( '/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

  app.get( '/auth/google/callback',
    passport.authenticate('google', (req, res) => {
      console.log("Response is " + res, "\n\nRequest is " + req);
      res.redirect('/');
    })
  );

  app.get('/api/logout', (req, res) => {
      req.logout();
      res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};