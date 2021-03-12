/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { addFavouriteMap, registerUser, getFavouriteMaps, getMyMaps, getUserByEmail } = require('../db/queries/users-queries');
const db = require('../lib/db');


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

router.post('/login', (req, res) => {
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

// POST /register
router.post("/register", (req, res) => {
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

//GET to /:id
router.get("/:id", (req, res) => {
  const userId = req.params.id;
  getMyMaps(userId)
    .then(maps => res.json(maps))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


// GET /users/:user_id/favourites
router.get("/:id/favourites", (req, res) => {
  const userId = req.params.id;
  getFavouriteMaps(userId)
    .then(maps => res.json(maps))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post("/:id/favourites", (req, res) => {
  // const userId = req.params.id;
  // const mapId = req.body.mapId;
  addFavouriteMap(userId, mapId)
    .then(() => {
      return getFavouriteMaps(userId);
    })
    .then(result => res.json(result))
    .catch(err => {
      res.status(500)
        .json({ error: err.message });
    });
});

//addFavouriteMap is meant to add info to db using an ajax call to custompointfeed.

module.exports = router;
