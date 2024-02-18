const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rutas de usuarios

router.get('/users/:id', usuarioController.obtenerUsuarioPorId);
router.put('/users/:id', usuarioController.actualizarUsuario);
router.delete('/users/:id', usuarioController.eliminarUsuario);

module.exports = router;