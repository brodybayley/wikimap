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

// const addPoint = (result) => {
//   const userId = req.params.userId;
//   const mapId = req.params.map_id;
//   const lat = results[0].geometry.location.latitude
//   const long = results[0].geometry.location.longitude
//   const title = results[0].address_components.formatted_address
//   return db.query(`INSERT INTO POINTS (user_id, map_id, title, latitude, longitude)
//    VALUES ($1, $2, $3, $4, $5)
//    RETURNING *;`, [userId, mapId, title, latitude, longitude])
// }


const addPoint = point => {
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
    point.image_url
  ];

  return db
    .query(queryStr, values)
    .then(res => res.rows[0]);
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
