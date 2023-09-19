const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hooprunner_test',
  password: process.env.DB_PW,
  port: 5432,
});

module.exports = pool;
