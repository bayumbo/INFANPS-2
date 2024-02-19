
const express = require('express');
const router = express.Router();
const informacionSeguridadController = require('../controllers/informacionSeguridadController');

// Definir rutas para información de seguridad
router.get('/informacion', informacionSeguridadController.obtenerInformacionSeguridad);
router.post('/informacion/crear', informacionSeguridadController.crearInformacionSeguridad);
router.get('/informacion/editar/:id', informacionSeguridadController.obtenerInformacionSeguridadPorId);
router.post('/informacion/editar/:id', informacionSeguridadController.actualizarInformacionSeguridad);
router.delete('/informacion/eliminar/:id', informacionSeguridadController.eliminarInformacionSeguridad);
router.delete('/informacion/eliminar/:id', informacionSeguridadController.eliminarInformacionSeguridad);




module.exports = router;