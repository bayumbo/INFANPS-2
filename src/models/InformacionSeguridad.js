const { Sequelize, DataTypes } = require('sequelize')

const InformacionSeguridad = (sequelize, DataTypes) => {
    const InformacionSeguridad = sequelize.define(
        'InformacionSeguridad', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contenido: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    multimedia: {
        type: DataTypes.STRING
    }
})
    return InformacionSeguridad;
};

module.exports = InformacionSeguridad;