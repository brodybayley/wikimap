const express = require('express');
const router = express.Router();
const { registerUser } = require('../db/queries/users-queries');

router.get('/', (req, res) => {
  const templateVars = {user: null};
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
