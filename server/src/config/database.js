//usando o pool, sem sequeliza

// const Pool = require('pg').Pool;

// const pool = new Pool({
//     user: "postgres",
//     password: "13579",
//     host: "localhost",
//     port:"5432",
//     database:"poketrainers"
// });

//module.exports = pool;

// ---- sequelize ----

module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '13579',
    database: 'poketrainers2',
    port: 5432,
    define: {
        timestamps: true,
        underscored: true,
    },
};