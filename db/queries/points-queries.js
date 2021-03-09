const db = require('../../lib/db');

const getMapPoints = mapID => {
  const queryStr = `
  SELECT points.*
  FROM points
  JOIN maps ON map_id = maps.id
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
  WHERE id = $6
  RETURNING *
  `;

  return db
    .query(queryStr, [point.title, point.description, point.longitude, point.latitude, point.image_url])
    .then(res => res.rows[0]);
};

const addPoint = point => {
  const queryStr = `
  INSERT INTO points (map_id, user_id, title, description, longitude, latitude, image_url)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *
  `;

  return db
    .query(queryStr, [point.map_id, point.user_id, point.title, point.description, point.longitude, point.latitude, point.image_url])
    .then(res => res.rows[0]);
};


const deletePoint = point => {
  const queryStr = `
  DELETE FROM points
  WHERE id = $1
  `;

  return db
    .query(queryStr, [point])
    .then(res => res.rows[0]);
};

module.exports = {
  getMapPoints,
  getPoint,
  editPoint,
  addPoint,
  deletePoint
};
