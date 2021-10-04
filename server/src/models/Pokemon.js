const { Model, DataTypes } = require('sequelize');

class Pokemon extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            image_url: DataTypes.STRING,
            attribute1: DataTypes.STRING,
            attribute2: DataTypes.STRING
        }, {
            sequelize: connection
        })
    }

    static associate(models) {
        this.belongsToMany(models.Trainer, { foreignKey: 'pokemon_id', through: 'trainer_pokemon', as: 'trainer' })
    }
}

module.exports = Pokemon;