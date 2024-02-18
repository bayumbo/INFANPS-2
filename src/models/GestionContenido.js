const { Sequelize, DataTypes } = require('sequelize')

const GestionContenido = (sequelize, DataTypes) => {
    const GestionContenido = sequelize.define('GestionContenido', {
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
    return GestionContenido;
};

module.exports = GestionContenido;