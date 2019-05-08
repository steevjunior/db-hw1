'use strict';


const pg = require('pg');

const pool = pg.Pool({
  connectionString: 'postgres://postgres:postgres@localhost:5432/instabook'
});
console.log("database.js")
const query = async (query) => (await pool.query(query)).rows;

module.exports = {
  query
};