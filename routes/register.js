const express = require('express');
const router = express.Router();
const { registerUser, getFavouriteMaps, getMyMaps, getUserByEmail } = require('../db/queries/users-queries');

router.get('/', (req, res) => {
  const templateVars = {};
  res.render('register', templateVars);
});


router.post("/", (req, res) => {
  registerUser({ ...req.body })
    .then(user => {
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