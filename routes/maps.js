const express = require('express');
const router = express.Router();
const { getMaps, getMapsById, addMap, editMap } = require('../db/queries/maps-queries');

// GET /maps/
router.get('/', (req, res) => {
  getMaps()
    .then(maps => res.json(maps))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// GET /maps/:id
router.get('/:id', (req, res) => {
  getMapsById(req.params.id)
    .then(map => res.json(map))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// POST /maps
router.post('/', (req, res) => {
  // const userId = req.session.userId;
  const userId = 1;
  console.log(req.body);
  addMap({ ...req.body, user_id: userId })
    .then(maps => res.json(maps))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// POST /maps/:id
router.post('/:id', (req, res) => {
  const mapId = req.params.id;
  editMap({ ...req.body, id: mapId })
    .then(maps => res.json(maps))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
