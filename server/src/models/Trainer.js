const { Model, DataTypes } = require('sequelize');

class Trainer extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            region: DataTypes.STRING,
            age: DataTypes.INTEGER,
            title: DataTypes.STRING,
            trainer_sprite: DataTypes.STRING,
            trainer_bio: DataTypes.TEXT
        }, {
            sequelize: connection
        })
    }
    static associate(models) {
        this.belongsToMany(models.Pokemon, { foreignKey: 'trainer_id', through: 'trainer_pokemon', as: 'pokemon' })
    }
}

module.exports = Trainer;