const express = require('express');
const router = express.Router();
const { registerUser, getFavouriteMaps, getMyMaps, getUserByEmail } = require('../db/queries/users-queries');

const login = (email, password) => {
  getUserByEmail(email)
    .then(user => {
      if (user.password === password) {
        return user;
      }
      return null;
    });
};
exports.login = login;

router.get('/', (req, res) => {
  const templateVars = {};
  res.render('login', templateVars);
});


router.post('/', (req, res) => {
  const { email, password } = req.body;
  login(email, password)
    .then(user => {
      if (!user) {
        res.send({ error: 'error' });
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