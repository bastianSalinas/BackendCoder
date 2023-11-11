const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Puedes usar el puerto que desees

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Importa las rutas
const toysRoutes = require('./routes/toys');
const usersRoutes = require('./routes/users');

// Configura las rutas
app.use('/toys', toysRoutes);
app.use('/users', usersRoutes);

app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
