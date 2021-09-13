const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "13579",
    host: "localhost",
    port:"5432",
    database:"poketrainers"
});

module.exports = pool;