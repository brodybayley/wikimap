const express = require('express');
const router = express.Router();
const { getMapPoints, getPoint, addPoint, deletePoint, editPoint } = require('../db/product-queries');


//Get all points on a map /maps/:map_id/points
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

exports.getMapPoints = getMapPoints;

//Get a specific point /maps/:map_id/points/:point_id
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

exports.getPoint = getPoint;

// //Edit a point /maps/:map_id/points/:point_id
// router.post("/points/:point_id", (req, res) => {
//   getPoint(pointID)
//     .then((point) => {
//       res.json(point);
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });

// const editPoint = pointID => {
//   const queryStr = `
//   UPDATE points
//   SET
//   WHERE id = $2
//   `;

//   return db
//     .query(queryStr, [pointID])
//     .then(res => res.rows[0]);
// };


// Add a point to a map /maps/:map_id/points
router.post("/points", (req, res) => {
  addPoint(pointID)
    .then((point) => {
      res.json(point);
    })
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

exports.addPoint = addPoint;


// Delete a point on a map /maps/:map_id/points/:point_id
router.post("/points/:point_id", (req, res) => {
  deletePoint(pointID)
    .then((point) => {
      res.json(point);
    })
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

exports.deletePoint = deletePoint;
