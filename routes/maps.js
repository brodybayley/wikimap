const express = require('express');
const router  = express.Router();
const { getMaps, getMapsById, addMap, deleteMap, editMap } = require('../db/queries/maps-queries');

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
  const userId = req.session.userId;
  addMap({...req.body, user_id: userId})
    .then(maps => res.json(maps))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// POST /maps/:id
router.post('/:id', (req, res) => {
  const mapId = req.params.Id;
  editMap({...req.body, id: mapId})
    .then(maps => res.json(maps))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// DELETE /maps/:id
router.delete('/:id', (req, res) => {
  deleteMap(req.params.id)
    .then(() => res.redirect('back'))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
