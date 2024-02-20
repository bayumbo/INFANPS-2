const { Notificaciones } = require('../Database/dataBase.orm');
const nodemailer = require('nodemailer');



const enviarCorreoNotificacion = async (usuarioEmail, asunto, mensaje) => {
    try {
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'bth4rts@gmail.com',
                pass: 'kttvmaunbeovxzvt',
            },
        });

        
        const htmlMensaje = `
            <html>
                <head>
                    <title>${asunto}</title>
                </head>
                <body>
                    <h1>${asunto}</h1>
                    <p>${mensaje}</p>
                    <p>Gracias,</p>
                    <p>INFANPS</p>
                </body>
            </html>
        `;

        // Configurar opciones del correo electrónico
        const mailOptions = {
            from: 'bth4rts@gmail.com',
            to: usuarioEmail,
            subject: asunto,
            html: htmlMensaje,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo:', error);
            } else {
                console.log('Correo enviado con éxito:', info.response);
            }
        });
        // Enviar el correo electrónico
        const info = await transporter.sendMail(mailOptions);

        console.log('Correo electrónico enviado con éxito:', info);

        return info;  // Devuelve la información del envío para su manejo
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        throw error; // Propaga el error para que pueda ser manejado en el controlador principal
    }
};

module.exports = {
    
    enviarCorreoNotificacion,
};