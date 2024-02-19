const express = require('express');
const router = express.Router();
const actividadesInteractivasController = require('../controllers/actividadesInteractivasController');

// Definir rutas para información de seguridad
router.get('/actividad', actividadesInteractivasController.obtenerActividad);
router.post('/actividad/crear', actividadesInteractivasController.crearActividad);
router.get('/actividad/:id/editar', actividadesInteractivasController.obtenerActividadPorId);
router.post('/actividad/:id/editar', actividadesInteractivasController.actualizarActividad);
router.get('/actividad/eliminar/:id', actividadesInteractivasController.eliminarActividad);





module.exports = router;