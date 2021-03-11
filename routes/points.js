const express = require('express');
const router = express.Router();
const { getMapPoints, getPoint, addPoint, deletePoint, editPoint } = require('../db/queries/points-queries');


//Get all points on a map /maps/:map_id/points
router.get("/:map_id/points", (req, res) => {
  const mapID = req.params.map_id;
  getMapPoints(mapID)
    .then(points => res.json(points))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


//Get a specific point /maps/:map_id/points/:point_id
router.get("/:map_id/points/:point_id", (req, res) => {
  const mapID = req.params.map_id;
  const pointID = req.params.point_id;
  getPoint(mapID, pointID)
    .then(point => res.json(point))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


//Edit a point /maps/:map_id/points/:point_id
router.post("/:map_id/points/:point_id", (req, res) => {
  const mapID = req.params.map_id;
  const pointID = req.params.point_id;
  editPoint({ ...req.body, map_id: mapID, id: pointID })
    .then(point => res.json(point))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


// Add a point to a map /maps/:map_id/points
router.post("/:map_id/points", (req, res) => {
  // const { userID: user_id } = 42;
  const user_id = 1;
  const { map_id } = req.params;
  // 
  addPoint({ ...req.body, user_id, map_id })
    .then(point => res.json(point))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


// Delete a point on a map /maps/:map_id/points/:point_id
router.delete("/:map_id/points/:point_id", (req, res) => {
  const mapID = req.params.map_id;
  const pointID = req.params.point_id;
  deletePoint(mapID, pointID)
    // .then(() => res.redirect('..'))
    .then(() => res.send('Deleted from points db'))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


module.exports = router;
