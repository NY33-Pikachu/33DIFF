const { Pool } = require('pg');
require('dotenv').config();


const PG_URI = 'postgres://blmcsufe:LuBfrjSIMlhGYBME5gWQfw9T8dhQOUhr@chunee.db.elephantsql.com/blmcsufe';
// SELECT * FROM "public"."neet_problems_table" LIMIT 100
// SELECT * FROM "public"."users_table"

const pool = new Pool({
  connectionString: process.env.PG_URI
});

module.exports = {
  query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
  }
};
