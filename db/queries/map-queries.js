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

const getFavouriteMaps = (user_id) => {
  const queryStr = `
    SELECT maps.*
    FROM favourites
    JOIN maps ON map_id = maps.id
    JOIN users ON user_id = users.id
    WHERE favourites.user_id = $1
  `;

  return db
    .query(queryStr, [user_id])
    .then(res => res.rows);
};

const getMyMaps = user_id => {
  const queryStr = `
    SELECT maps.*
    FROM maps
    JOIN users ON user_id = users.id
    WHERE user_id = $1
  `;

  return db
    .query(queryStr, [user_id])
    .then(res => res.rows);
};

module.exports = {
  getMaps,
  getMapsById,
  getFavouriteMaps,
  getMyMaps
};
