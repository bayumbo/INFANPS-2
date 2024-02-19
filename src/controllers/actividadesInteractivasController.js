const orm = require('../Database/dataBase.orm');



const obtenerActividad = async(req, res) => {
    try {
        const actividad = await orm.ActividadInteractiva.findAll();
        
        return res.render('actividad', { actividad });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener información de seguridad' });
    }
};

const crearActividad = async (req, res) => {
    try {
        // Extrae los datos del cuerpo de la solicitud
        const { titulo, descripcion, multimedia, UsuarioId, gestionContenidoId } = req.body;

        // Crea una nueva instancia de información de seguridad con los datos proporcionados
        const nuevaActividad = await orm.ActividadInteractiva.create({
            titulo,
            descripcion,
            multimedia,
            UsuarioId,
            gestionContenidoId
        });

        // Devuelve una respuesta con el nuevo objeto creado
        return res.redirect('/actividad');
    } catch (error) {
        // Maneja cualquier error que ocurra durante la creación de la información de seguridad
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al crear nueva Actividad' });
    }
};



const obtenerActividadPorId = async(req, res) => {
    const id = req.params.id;
    try {
        const actividad = await orm.ActividadInteractiva.findByPk(id);
        if (!actividad) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        
        return res.render('editarActividad', { actividad});
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener la Actividad' });
    }
};


const actualizarActividad = async(req, res) => {
    try {
        const { id } = req.params;
        // Buscar la información de seguridad a actualizar en la base de datos
        const actividad = await orm.ActividadInteractiva.findByPk(id);
        if (!actividad) {
            return res.status(404).json({ mensaje: 'Información de seguridad no encontrada' });
        }
        // Actualizar los campos de la información de seguridad con los datos enviados en la solicitud
        await actividad.update(req.body);
        // Redirigir a la página de información de seguridad después de la actualización
        return res.redirect('/actividad');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al actualizar la información de seguridad' });
    }
};

const eliminarActividad = async(req, res) => {
    const { id } = req.params;
    try {
        const filasEliminadas = await orm.ActividadInteractiva.destroy({ where: { id } });
        if (filasEliminadas === 0) {
            return res.status(404).json({ mensaje: 'Información de seguridad no encontrada' });
        }

        return res.redirect('/actividad');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al eliminar información de seguridad' });
    }
};

module.exports = {
    obtenerActividad,
    crearActividad,
    obtenerActividadPorId,
    actualizarActividad,
    eliminarActividad,

};