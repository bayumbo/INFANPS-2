
const express = require('express');
const router = express.Router();
const informacionSeguridadController = require('../controllers/informacionSeguridadController');

// Definir rutas para información de seguridad
router.get('/informacion', informacionSeguridadController.obtenerInformacionSeguridad);
router.post('/informacion/crear', informacionSeguridadController.crearInformacionSeguridad);
router.get('/informacion/:id/editar', informacionSeguridadController.obtenerInformacionSeguridadPorId);
router.post('/informacion/:id/editar', informacionSeguridadController.actualizarInformacionSeguridad);
router.get('/informacion/eliminar/:id', informacionSeguridadController.eliminarInformacionSeguridad);





module.exports = router;