const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Pokemon = require('../models/Pokemon');
const Trainer = require('../models/Trainer')

//estabelecendo conexão
const connection = new Sequelize(dbConfig);

Trainer.init(connection);
Pokemon.init(connection);

Trainer.associate(connection.models);
Pokemon.associate(connection.models);

module.exports = connection;