const express = require('express');
const router = express.Router();
const { getMapPoints, getPoint } = require('../db/product-queries');

//GET /maps/:map_id/points
router.get("/points", (req, res) => {
  getMapPoints(mapID)
    .then((points) => {
      res.json(points);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

const getMapPoints = mapID => {
  const queryStr = `
  SELECT *
  FROM points
  JOIN maps ON map_id = maps.id
  WHERE map_id = $1
  `;

  return db
    .query(queryStr, [mapID])
    .then(res => res.rows);
};

module.exports = router;

//GET /maps/:map_id/points/:point_id
router.get("/points/:point_id", (req, res) => {
  getPoint(pointID)
    .then((point) => {
      res.json(point);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

const getPoint = pointID => {
  const queryStr = `
  SELECT *
  FROM points
  WHERE id = $1
  `;

  return db
    .query(queryStr, [pointID])
    .then(res => res.rows[0]);
};

// ### Points
// * Edit    => POST   =>  '/maps/:map_id/points/:point_id'
// * Add     => POST   =>  '/maps/:map_id/points'
// * Delete  => DELETE =>  '/maps/:map_id/points/:point_id'
