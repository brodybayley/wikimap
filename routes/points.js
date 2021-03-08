const express = require('express');
const router = express.Router();

//GET /maps/:map_id/points
router.get("/points", (req, res) => {
  getMapPoints(mapID)
    .then((response) => {
      const points = response.rows;
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
  WHERE mapID = $1
  `;

  return db
    .query(queryStr, [mapID])
    .then(res => res.rows);
};

module.exports = router;



// ### Points
// * Browse  => GET    =>  '/maps/:map_id/points'
// * Read    => GET    =>  '/maps/:map_id/points/:point_id'
// * Edit    => POST   =>  '/maps/:map_id/points/:point_id'
// * Add     => POST   =>  '/maps/:map_id/points'
// * Delete  => DELETE =>  '/maps/:map_id/points/:point_id'
