const express = require('express');
const TrainerController = require('../src/controllers/TrainerController');
const PokemonController = require('./controllers/PokemonController');

const routes = express.Router();

// ------------------------------------ Treinador ------------------------------------

//todos os treinadores:
//routes.get('/trainer', TrainerController.index);

//Treinador especifico
routes.get('/trainer/:name', TrainerController.specificIndex);

//Criar um treinador
routes.post('/trainer', TrainerController.store);

// ------------------------------------ Pokemon ------------------------------------

//adicionar um pokemon
routes.post('/trainer/:trainer_id/pokemon', PokemonController.store);

//pegar todos os pokemons de um treinador
routes.get('/trainer/:trainer_id/pokemon', PokemonController.index);

//procurar um pokemon pelo tipo
routes.get('/trainer/:trainer_id/pokemon/:attribute', PokemonController.typeIndex);

//Enviar um pokemon para o professor
routes.delete('/trainer/:trainer_id/pokemon', PokemonController.delete);


module.exports = routes;