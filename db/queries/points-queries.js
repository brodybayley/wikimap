const db = require('../../lib/db');

const getMapPoints = mapID => {
  const queryStr = `
  SELECT points.*
  FROM points
  WHERE map_id = $1
  `;

  return db
    .query(queryStr, [mapID])
    .then(res => res.rows);
};


const getPoint = (mapID, pointID) => {
  const queryStr = `
  SELECT *
  FROM points
  WHERE map_id = $1 AND id = $2
  `;

  return db
    .query(queryStr, [mapID, pointID])
    .then(res => res.rows[0]);
};


const editPoint = point => {
  const queryStr = `
  UPDATE points
  SET title = $1,
      description = $2,
      longitude = $3,
      latitude = $4,
      image_url = $5
  WHERE map_id = $6 AND id = $7
  RETURNING *
  `;

  const values = [
    point.title,
    point.description,
    point.longitude,
    point.latitude,
    point.image_url,
    point.map_id,
    point.id
  ];

  return db
    .query(queryStr, values)
    .then(res => res.rows[0]);
};


const addPoint = function (point) {
  const queryStr = `
  INSERT INTO points (map_id, user_id, title, description, longitude, latitude, image_url)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *
  `;

  const values = [
    point.map_id,
    point.user_id,
    point.title,
    point.description,
    point.longitude,
    point.latitude,
    point.image_url //will be properly implemented when the form is passed
  ];
  console.log('values', values);

  return db
    .query(queryStr, values)
    .then(res => res.rows);
};


const deletePoint = (mapID, pointID) => {
  const queryStr = `
  DELETE FROM points
  WHERE map_id = $1 AND id = $2
  `;

  return db
    .query(queryStr, [mapID, pointID])
    .then(res => res.rows[0]);
};

module.exports = {
  getMapPoints,
  getPoint,
  editPoint,
  addPoint,
  deletePoint
};
