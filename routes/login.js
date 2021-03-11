const express = require('express');
const router = express.Router();
const { getUserByEmail } = require('../db/queries/users-queries');

const login = (email, password) => {
  return getUserByEmail(email)
    .then(user => {
      if (user.password === password) {
        return user;
      }
      return null;
    });
};
exports.login = login;

router.get('/', (req, res) => {
  const templateVars = { user: null };
  res.render('login', templateVars);
});


router.post('/', (req, res) => {
  const { email, password } = req.body;
  login(email, password)
    .then(user => {
      if (!user) {
        res.send('Wrong login. Please check your email or password and try again.');
      }
      req.session.userId = user.id;
      res.redirect('/');
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
