'use strict';

const database = require('../database');
const SQL = require('pg-template-tag').default;

const createTable = () => {
  database.query(`
  CREATE TABLE IF NOT EXISTS
    comments
    (
      id SERIAL PRIMARY KEY,
      content TEXT NULL,
      user_id INTEGER NOT NULL,
      post_id INTEGER NOT NULL
    );
`);}

const createRow = async (data,userid,postid) => (await database.query(SQL`
  INSERT INTO
  comments
    (
      content,
      user_id,
      post_id
    )
  VALUES
    (
      ${data.content},
      ${userid},
      ${postid}
    )
  RETURNING
    *;
`))[0] || null;

const getRows = (id) => database.query(`
  SELECT
    *
  FROM
    comments
  WHERE 
      post_id=${id};
`);

const getRow = async (id) => (await database.query(SQL`
  SELECT
    *
  FROM
  comments
  WHERE
    id = ${id};
`))[0] || null;

const updateRow = async (id, data) => (await database.query(SQL`
  UPDATE
    comments
  SET
    content = ${data.content}
  WHERE
    id = ${id}
  RETURNING
    *;
`))[0] || null;

const deleteRow = id => database.query(SQL`
  DELETE FROM
  comments
  WHERE
    id = ${id};
`);

module.exports = {
  createTable,
  createRow,
  getRows,
  getRow,
  updateRow,
  deleteRow
};
