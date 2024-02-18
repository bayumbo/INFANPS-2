const passport = require('../lib/passport');
const { isLoggedIn } = require('../lib/auth');
const { cifrarDatos } = require('../lib/encrypDates');
const usuario = require('../Database/dataBase.orm');

const authController = {};

// Función para iniciar sesión
authController.signIn = passport.authenticate('local.signin', {
    successRedirect: '/users/{{id}}',
    failureRedirect: '/login',
    failureFlash: true
});

// Función para registrar un nuevo usuario
authController.signUp = passport.authenticate('local.signup', {
    successRedirect: '/login',
    failureRedirect: '/register',
    failureFlash: true
});

// Función para cerrar sesión
authController.signOut = (req, res) => {
    req.logout();
    res.redirect('/');
};

// Middleware para verificar si el usuario está autenticado
authController.isLoggedIn = isLoggedIn;

// Función para mostrar el formulario de inicio de sesión
authController.showLoginForm = (req, res) => {
    res.render('login', { message: req.flash('message') });
};

// Función para mostrar el formulario de registro
authController.showRegisterForm = (req, res) => {
    res.render('register', { message: req.flash('message') });
};

module.exports = authController;