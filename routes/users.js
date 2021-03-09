/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { registerUsers, getFavouriteMaps, getMyMaps, getUsers } = require('./db/userQueries.js')

// TO DO: ejs files
router.get('/register', (req, res) => {
  const templateVars = {};
  res.render('register', templateVars);
})

//Same as above, requires ejs
router.get('/login', (req, res) => {
  const templateVars = {};
  res.render('url_login', templateVars)
})

router.post('/login', (req, res) => {
  const username = req.body.name;
  const password = req.body.password;
  const userInfo = getUsers(username, password)
  console.log(userInfo);
  if (userInfo) { //conditional to check goes here
    req.session.userId = user.id;
    res.redirect('/')
  }
})

// POST /register
router.post("/register", (req, res) => {
  registerUsers(userId)
    .then(user => {
      req.session.userId = user.id;
      res.redirect('/')
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    })
})

//GET to /:id
router.get("/:id", (req, res) => {
  const userId = req.session.userId;
  getMyMaps(userId)
    .then(maps => res.json(maps))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    })
})



// queries function file

// GET /users/:user_id/favourites
router.get("/favourites", (req, res) => {
  const userId = req.session.userId;
  getFavouriteMaps(userId)
    .then(maps => res.json(maps))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// OLD EXAMPLE ROUTE
router.get("/", (req, res) => {
  db.query(`SELECT * FROM users;`)
    .then(data => {
      const users = data.rows;
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});
return router;

module.exports = router;
