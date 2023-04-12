const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// Configuración de EJS como motor de plantillas
app.set('view engine', 'ejs');

// Middleware para procesar datos del cuerpo de las solicitudes HTTP
app.use(bodyParser.urlencoded({ extended: true }));

// Directorio de archivos estáticos
app.use(express.static(__dirname + '/public'));

// Ruta de inicio de sesión
app.get('/', (req, res) => {
    res.render('login');
});

// Ruta de matriculas
app.post('/matriculas', (req, res) => {
    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;

    // Lógica para verificar el inicio de sesión y redireccionar a la vista de matriculas
    // Aquí puedes implementar la lógica de autenticación con la base de datos o cualquier otro método
    // Si la autenticación es exitosa, redirecciona a la vista de matriculas
    if (usuario === 'usuario' && contrasena === 'contrasena') {
        res.render('matriculas');
    } else {
        // Si la autenticación falla, puedes renderizar una vista de error o redireccionar a otra página
        res.render('login', { error: 'Usuario o contraseña incorrectos' });
    }
});
const precios = {
    'Java': 1200,
    'PHP': 800,
    'Net': 1500
};

// Ruta de confirmacion de matriculas
app.post('/confirmacion', (req, res) => {
    const { curso, nivel, medioPago } = req.body;
    const precio = calcularPrecio(curso, nivel); // Agrega esta línea
    res.render('confirmacion', { curso, nivel, medioPago, precio });
});


function calcularPrecio(nombre, nivel, medioPago) {
    let precio = precios[nombre];
    if (medioPago === "Pago en efectivo") {
        precio *= 0.9; // Descuento del 10%
    }
    return precio;
}



app.post('/confirmacion', function (req, res) {
    const { curso, nivel, medioPago } = req.body;
    const precio = calcularPrecio(curso, nivel, medioPago);
    res.render('confirmacion', { curso: curso, nivel: nivel, medioPago: medioPago, precio: precio });
});



// Puerto en el que el servidor escucha las solicitudes
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
