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


module.exports = {
  getMaps,
  getMapsById,
};
