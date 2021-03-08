const express = require('express');
const router  = express.Router();
const { getMaps, getMapsById, getFavouriteMaps, getMyMaps } = require('../db/queries/map-queries');

// GET /maps/
router.get("/", (req, res) => {
  getMaps()
    .then(maps => res.json(maps))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// GET /maps/:id
router.get("/:id", (req, res) => {
  getMapsById(req.params.id)
    .then(map => res.json(map))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

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

module.exports = router;
