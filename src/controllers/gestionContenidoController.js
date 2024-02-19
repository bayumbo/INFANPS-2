const gestionContenido = (req, res) => {
    // Renderiza la plantilla correspondiente
    res.render('gestionContenido');
     // Asegúrate de que 'gestionContenido' sea el nombre de tu plantilla HBS
};


// Exporta el controlador para que pueda ser utilizado por otros módulos
module.exports = {
    gestionContenido
};