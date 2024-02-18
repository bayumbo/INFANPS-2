const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const {usuario} = require('../Database/dataBase.orm');
const { cifrarDatos } = require('./encrypDates');

passport.use(
    'local.signin',
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            try {
                // Realiza una validación previa para verificar si el nombre de usuario está presente
                const existingUser = await usuario.findOne({ where: { username: username } });

                // Si no se encuentra ningún usuario, devuelve un mensaje de error
                if (!existingUser) {
                    return done(null, false, { message: 'El nombre de usuario no existe.' });
                }

                // Si el usuario existe, verifica la contraseña
                const validPassword = await bcrypt.compare(password, existingUser.password);

                // Si la contraseña no es válida, devuelve un mensaje de error
                if (!validPassword) {
                    return done(null, false, req.flash('message', 'Contraseña incorrecta'));
                }

                // Si todo está bien, devuelve el usuario autenticado
                return done(null, existingUser, req.flash('message', `Bienvenido ${existingUser.username}`));
            } catch (error) {
                // Maneja cualquier error que ocurra durante la autenticación
                return done(error);
            }
        }
    )
);
passport.use(
    'local.signup',
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            try {
                const existingUser = await usuario.findOne({ where: { username: username } });

                if (existingUser) {
                    return done(null, false, req.flash('message', 'El nombre de usuario ya existe.'));
                }

                const hashedPassword = await bcrypt.hash(password, 10); // Número de salt rounds

                const newUser = {
                    username: username,
                    password: hashedPassword,
                    name: req.body.name,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    phone: req.body.phone
                    
                    // Aquí debes incluir los demás campos del usuario que necesites
                };

                // Crea el nuevo usuario en la base de datos
                const createdUser = await usuario.create(newUser);

                return done(null, createdUser, req.flash('message', 'Usuario registrado correctamente'));
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await usuario.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;