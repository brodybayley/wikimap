/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { addFavouriteMap, registerUser, getFavouriteMaps, getMyMaps, getUserByEmail } = require('../db/queries/users-queries');


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
  console.log('req.body', req.body)
  const userId = req.params.id;
  const mapId = req.body.mapId;
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

module.exports = router;
