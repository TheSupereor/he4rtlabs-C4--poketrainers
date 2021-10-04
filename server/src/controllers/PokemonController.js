const Pokemon = require('../models/Pokemon');
const Trainer = require('../models/Trainer');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    //ver todos os pokemons
    async index(req, res) {
        const { trainer_id } = req.params;

        const trainer = await Trainer.findByPk(trainer_id, {
            include: { 
                association: 'pokemon',
                 through: {
                     attributes: []
                 }
            }
        });

        return res.json(trainer.pokemon);
    },

    //filtrar pelo tipo de pokemon
    async typeIndex(req, res) {
        const { trainer_id, attribute } = req.params;

        const trainer = await Trainer.findByPk(trainer_id, {
            include: { 
                association: 'pokemon',
                where: {
                    [Op.or]: [{attribute1:attribute}, {attribute2:attribute}]
                },
                through: {
                    attributes: []
                }
            }
        });

        return res.json(trainer.pokemon);
    },

    //guardar novo pokemon
    async store(req, res) {
        const { trainer_id } = req.params;
        const { name, image_url, attribute1, attribute2 } = req.body;

        const trainer = await Trainer.findByPk(trainer_id);
    
        if(!trainer) {
            return res.status(400).json({error: 'Treinador não cadastrado!'})
        }

        const [ pokemon ] = await Pokemon.findOrCreate({
            where: { name, image_url, attribute1, attribute2 }
        });

        await trainer.addPokemon(pokemon);

        return res.json(pokemon);
    },

    //deletar pokemon
    async delete(req, res) {
        const { trainer_id } = req.params;
        const { id } = req.body;

        const trainer = await Trainer.findByPk(trainer_id);
    
        if(!trainer) {
            return res.status(400).json({error: 'Treinador não cadastrado!'})
        }

        const pokemon = await Pokemon.findOne({
            where: { id }
        });

        await trainer.removePokemon(pokemon);

        return res.json()
    }
}