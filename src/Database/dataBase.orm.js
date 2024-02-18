const { Sequelize } = require("sequelize");
const { MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, MYSQLPORT, MYSQL_URI } = require("../keys");

let sequelize;

// Usar URI de conexión si está disponible
if (MYSQL_URI) {
    sequelize = new Sequelize(MYSQL_URI);
} else {
    // Configuración para parámetros individuales
    sequelize = new Sequelize(MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD, {
        host: MYSQLHOST,
        port: MYSQLPORT,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 1,
            acquire: 30000,
            idle: 10000
        }
    });
}
// Importar modelos
const UsuarioModel = require('../models/Usuario');
const ActividadInteractivaModel = require('../models/ActividadInteractiva');
const ForoModel = require('../models/Foro');
const InformacionSeguridadModel = require('../models/InformacionSeguridad');
const GestionContenidoModel = require('../models/GestionContenido');

//Sincronía
const usuario = UsuarioModel(sequelize, Sequelize);
const ActividadInteractiva = ActividadInteractivaModel(sequelize, Sequelize);
const Foro = ForoModel(sequelize, Sequelize);
const InformacionSeguridad = InformacionSeguridadModel(sequelize, Sequelize);
const GestionContenido = GestionContenidoModel(sequelize, Sequelize);

// Definir relaciones
usuario.hasMany(ActividadInteractiva);
usuario.hasMany(Foro);
usuario.hasMany(InformacionSeguridad);
GestionContenido.belongsTo(usuario);

// Definir relaciones adicionales para editar la información desde GestionContenido
GestionContenido.hasMany(ActividadInteractiva, { foreignKey: 'gestionContenidoId' });
GestionContenido.hasMany(Foro, { foreignKey: 'gestionContenidoId' });
GestionContenido.hasMany(InformacionSeguridad, { foreignKey: 'gestionContenidoId' });

// Autenticar y sincronizar
sequelize.authenticate()
    .then(() => {
        console.log("Conexión establecida con la base de datos");
    })
    .catch((err) => {
        console.error("No se pudo conectar a la base de datos:", err.message);
    });

// Sincronizar modelos con la base de datos
sequelize.sync({ force: false })
    .then(() => {
        console.log("Tablas sincronizadas");
    })
    .catch((err) => {
        console.error("Error al sincronizar las tablas:", err.message);
    });

module.exports = {

    sequelize,
    usuario,
    ActividadInteractiva,
    Foro,
    InformacionSeguridad,
    GestionContenido,
};


