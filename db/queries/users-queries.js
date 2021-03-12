const db = require('../../lib/db');

const registerUser = users => {
  const queryStr = `
    INSERT into users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  return db
    .query(queryStr, [users.name, users.email, users.password])
    .then(res => res.rows[0]);
};

const getUserByEmail = email => {
  return db
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    .then(res => res.rows[0]);
};

const getUserById = id => {
  return db
    .query(`SELECT * FROM users WHERE id = $1`, [id])
    .then(res => res.rows[0]);
};

const addFavouriteMap = ({ userId, mapId) => {
  return db
    .query(`
      INSERT into favourites (user_id, map_id) VALUES ($1, $2)
      RETURNING *;`, [userId, mapId])
    .then(res => res.rows);
};

const addUserMap = map => {
  return db
    .query(`
      INSERT INTO maps (user_id, title, description)
      VALUES ($1, $2, $3)
      RETURNING *`, [map.user_id, map.title, map.description])
    .then(res => res.rows);
};


const getFavouriteMaps = userId => {
  const queryStr = `
    SELECT maps.*
    FROM favourites
    JOIN maps ON map_id = maps.id
    JOIN users ON favourites.user_id = users.id
    WHERE favourites.user_id = $1
  `;

  return db
    .query(queryStr, [userId])
    .then(res => res.rows);
};

const getMyMaps = userId => {
  const queryStr = `
    SELECT maps.*
    FROM maps
    JOIN users ON user_id = users.id
    WHERE user_id = $1
  `;

  return db
    .query(queryStr, [userId])
    .then(res => res.rows);
};

// export all functions
module.exports = {
  registerUser,
  getFavouriteMaps,
  getMyMaps,
  getUserByEmail,
  getUserById,
  addFavouriteMap,
  addUserMap
};
