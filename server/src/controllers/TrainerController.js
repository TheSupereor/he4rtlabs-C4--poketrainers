const Trainer = require('../models/Trainer');

module.exports = {
    // async index(req, res) {
    //     const trainers = await Trainer.findAll();
    //     return res.json(trainers);
    // },

    async specificIndex(req, res) {
        const { name } = req.params;

        const trainer = await Trainer.findOne({
            where: { name }
        });

        if(!trainer) {
            return res.status(400).json({error: 'Treinador não cadastrado!'})
        }

        return res.json(trainer);
    },

    async store(req, res) {
        const { name, region, age, title, trainer_sprite, trainer_bio } = req.body;

        const trainer = await Trainer.create({ name, region, age, title, trainer_sprite, trainer_bio });
    
        return res.json(trainer);
    }
}