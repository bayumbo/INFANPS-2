const orm = require('../Database/dataBase.orm');
const bcrypt = require('bcrypt');
// Función para obtener un usuario por su ID
const obtenerUsuarioPorId = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await orm.usuario.findByPk(id);
        if (!user) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        return res.render('perfil', { user});
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener perfil de usuario por ID' });
    }
    
}; 

const mostrarFormularioEdicion = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await orm.usuario.findByPk(id);
        if (!user) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        return res.render('editarPerfil', { user});
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener perfil de usuario por ID' });
    }
    
}; 


// Función para actualizar un usuario
const actualizarUsuario = async (req, res) => {
    const id = req.params.id;
    const { username, password, name, lastName, email, phone } = req.body;
    try {
        // Busca el usuario por su ID
        const user = await orm.usuario.findByPk(id);
        
        // Si no se encuentra el usuario, devuelve un mensaje de error
        if (!user) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // Actualiza los datos del usuario con los valores recibidos en la solicitud
        user.username = username;
        user.password = hashedPassword;
        user.name = name;
        user.lastName = lastName;
        user.email = email;
        user.phone = phone;
        
        // Guarda los cambios en la base de datos
        await user.save();
        
        // Redirige a la página de perfil del usuario actualizado
        return res.redirect(`/users/${id}`);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al actualizar usuario' });
    }
};

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
    
    mostrarFormularioEdicion,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
};