const db = require('../../lib/db');

const getMaps = () => {
  const queryStr = `
    SELECT *
    FROM maps
  `;

  return db
    .query(queryStr)
    .then(res => res.rows);
};

const getMapsById = id => {
  const queryStr = `
    SELECT *
    FROM maps
    WHERE id = $1
  `;

  return db
    .query(queryStr, [id])
    .then(res => res.rows[0]);
};

const addMap = map => {
  const queryStr = `
    INSERT INTO maps (user_id, title, description)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const values = [map.user_id, map.title, map.description];

  return db
    .query(queryStr, values)
    .then(res => res.rows);
};

const deleteMap = mapId => {
  const queryStr = `
    DELETE FROM maps
    WHERE id = $1
  `;

  return db
    .query(queryStr, [mapId])
    .then(res => res.rows);
};

const editMap = map => {
  const queryStr = `
    UPDATE maps
    SET title = $1
      , description = $2
    WHERE id = $3
    RETURNING *
  `;

  const values = [map.title, map.description, map.id];

  return db
    .query(queryStr, values)
    .then(res => res.rows);
};

module.exports = {
  getMaps,
  getMapsById,
  addMap,
  deleteMap,
  editMap
};
