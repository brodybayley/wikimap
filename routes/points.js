const express = require('express');
const router = express.Router();
const { getMapPoints, getPoint, addPoint, deletePoint, editPoint } = require('../db/product-queries');


//Get all points on a map /maps/:map_id/points
router.get("/", (req, res) => {
  getMapPoints(mapID)
    .then(points => res.json(points))
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


//Get a specific point /maps/:map_id/points/:point_id
router.get("/:point_id", (req, res) => {
  getPoint(pointID)
    .then(point => res.json(point))
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


//Edit a point /maps/:map_id/points/:point_id
router.post("/:point_id", (req, res) => {
  const userID = req.session.userID;
  const mapID = req.session.mapID;
  editPoint({ ...req.body, user_id: userID, map_id: mapID })
    .then(point => res.json(point))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

const editPoint = pointID => {
  const queryStr = `
  UPDATE points
  SET title = $1
  SET description = $2
  SET longitude = $3
  SET latitude = $4
  SET image = $5
  WHERE id = $6
  RETURNING *
  `;

  return db
    .query(queryStr, [point.title, point.description, point.longitude, point.latitude, point.image_url])
    .then(res => res.rows[0]);
};


// Add a point to a map /maps/:map_id/points
router.post("/", (req, res) => {
  const userID = req.session.userID;
  const mapID = req.session.mapID;
  addPoint({ ...req.body, user_id: userID, map_id: mapID })
    .then(point => res.json(point))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

const addPoint = (point) => {
  const queryStr = `
  INSERT INTO points (map_id, user_id, title, description, longitude, latitude, image_url)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *
  `;

  return db
    .query(queryStr, [point.map_id, point.user_id, point.title, point.description, point.longitude, point.latitude, point.image_url])
    .then(res => res.rows[0]);
};


// Delete a point on a map /maps/:map_id/points/:point_id
router.delete("/:id", (req, res) => {
  deletePoint(req.params.id)
    .then(point => res.json(point))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

const deletePoint = (point) => {
  const queryStr = `
  DELETE FROM points
  WHERE id = $1
  `;

  return db
    .query(queryStr, [point])
    .then(res => res.rows[0]);
};

module.exports = router;
