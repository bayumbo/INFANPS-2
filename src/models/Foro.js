const { Sequelize, DataTypes } = require('sequelize')

const Foro = (sequelize, DataTypes) => {
    const Foro = sequelize.define('Foro', {
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
    return Foro;
};

module.exports = Foro;