const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rutas de autenticación
router.get('/login', authController.showLoginForm);
router.post('/login', authController.signIn);
router.get('/register', authController.showRegisterForm);
router.post('/register', authController.signUp);
router.get('/logout', authController.signOut);

module.exports = router; 