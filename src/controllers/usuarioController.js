const orm = require('../Database/dataBase.orm');

// Función para obtener un usuario por su ID
const obtenerUsuarioPorId = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await orm.usuario.findAll();
        if (!user) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        // Renderizar el archivo HBS de perfil con los datos del usuario
        return res.render('perfil', { user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener perfil de usuario por ID' });
    }
};

// Función para actualizar un usuario
async function actualizarUsuario(req, res) {
    const id = req.params.id;
    const { nombre, email, contraseña } = req.body;
    try {
        let usuario = await usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        usuario.nombre = nombre;
        usuario.email = email;
        usuario.contraseña = contraseña;
        await usuario.save();
        res.status(200).json({ mensaje: 'Usuario actualizado correctamente', usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar usuario' });
    }
}

// Función para eliminar un usuario
async function eliminarUsuario(req, res) {
    const id = req.params.id;
    try {
        const usuario = await usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        await usuario.destroy();
        res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar usuario' });
    }
}

module.exports = {
    

    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
};