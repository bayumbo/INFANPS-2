const { Sequelize, DataTypes } = require('sequelize')

const ActividadInteractiva = (sequelize, DataTypes) => {
    const ActividadInteractiva = sequelize.define('ActividadInteractiva', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    multimedia: {
        type: DataTypes.STRING
    }
})
    return ActividadInteractiva;
};

module.exports = ActividadInteractiva;