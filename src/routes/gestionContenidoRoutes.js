const express = require('express');
const router = express.Router();
const gestionContenidoController = require('../controllers/gestionContenidoController');

// Rutas para ver y eliminar la información
router.get('/gestionContenido', gestionContenidoController.gestionContenido);


module.exports = router;