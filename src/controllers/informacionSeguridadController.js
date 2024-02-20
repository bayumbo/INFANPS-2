const orm = require('../Database/dataBase.orm');
const { enviarCorreoNotificacion } = require('../controllers/notificacionesController');


const obtenerInformacionSeguridad = async(req, res) => {
    try {
        const informacionSeguridad = await orm.InformacionSeguridad.findAll();
        
        return res.render('informacionSeguridad', { informacionSeguridad });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener información de seguridad' });
    }
};

const crearInformacionSeguridad = async (req, res) => {
    try {
        // Extrae los datos del cuerpo de la solicitud
        const { titulo, contenido, gestionContenidoId } = req.body;
        const multimedia = req.file ? req.file.filename : null;
        
        // Crea una nueva instancia de información de seguridad con los datos proporcionados
        const nuevaInformacionSeguridad = await orm.InformacionSeguridad.create({
            titulo,
            contenido,
            multimedia,
            gestionContenidoId
        });
        
        // Obtener todos los usuarios
        const usuarios = await orm.usuario.findAll();
        
        // Asunto y mensaje de la notificación
        const asunto = 'Nueva información creada';
        const mensaje = `Se ha creado una nueva información: ${titulo}`;

        // Enviar notificación por correo a todos los usuarios
        for (const usuario of usuarios) {
            const correoUsuario = usuario.email;

            // Verificar si el usuario tiene un correo electrónico
            if (!correoUsuario) {
                console.error(`Usuario sin dirección de correo electrónico: ${usuario.id}`);
                continue;
            }

            // Enviar correo electrónico
            await enviarCorreoNotificacion(correoUsuario, asunto, mensaje);
        }

        // Devuelve una respuesta con el nuevo objeto creado
        return res.redirect('/informacion');
    } catch (error) {
        // Maneja cualquier error que ocurra durante la creación de la información de seguridad
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al crear nueva información de seguridad' });
    }
};


const obtenerInformacionSeguridadPorId = async(req, res) => {
    const id = req.params.id;
    try {
        const informacion = await orm.InformacionSeguridad.findByPk(id);
        if (!informacion) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        return res.render('editarInformacionSeguridad', { informacion});
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener la informacion' });
    }
};


const actualizarInformacionSeguridad = async(req, res) => {
    try {
        const { id } = req.params;
        // Buscar la información de seguridad a actualizar en la base de datos
        const informacionSeguridad = await orm.InformacionSeguridad.findByPk(id);
        if (!informacionSeguridad) {
            return res.status(404).json({ mensaje: 'Información de seguridad no encontrada' });
        }
        // Actualizar los campos de la información de seguridad con los datos enviados en la solicitud
        await informacionSeguridad.update(req.body);
        // Redirigir a la página de información de seguridad después de la actualización
        return res.redirect('/informacion');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al actualizar la información de seguridad' });
    }
};

const eliminarInformacionSeguridad = async(req, res) => {
    const { id } = req.params;
    try {
        const filasEliminadas = await orm.InformacionSeguridad.destroy({ where: { id } });
        if (filasEliminadas === 0) {
            return res.status(404).json({ mensaje: 'Información de seguridad no encontrada' });
        }

        return res.redirect('/informacion');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al eliminar información de seguridad' });
    }
};

module.exports = {
    obtenerInformacionSeguridad,
    crearInformacionSeguridad,
    obtenerInformacionSeguridadPorId,
    actualizarInformacionSeguridad,
    eliminarInformacionSeguridad,

};