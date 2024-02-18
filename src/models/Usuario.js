const { Sequelize, DataTypes } = require("sequelize")


const usuario = (sequelize, DataTypes) => {
    const usuario = sequelize.define(
        'Usuario', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false
            }
        })
        return usuario;
    };

module.exports = usuario;