const { Pool } = require('pg');

const pool = new Pool({
  connectionString: "postgresql://postgres:pass3211@fieldsyncdb.c3ouweg2kibx.us-east-2.rds.amazonaws.com:5432/postgres",
  ssl: {
    rejectUnauthorized: false
  }
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error :', err.stack);
  } else {
    console.log('Database connected successfully');
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};