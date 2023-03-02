const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({path:'variables.env'});

// Cors permite que un cliente se conecte a otro servidor
const cors = require('cors');

// Conectar Mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log('conectado a BD de mongodb')) 
.catch(e => console.log('error de conexión', e))

//crear servidor
const app = express();

// Habilitar Cors
app.use(cors());

// Rutas de la App
app.use('/', routes()); 

// Carpeta pública
app.use(express.static('uploads'));

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

// Iniciar App
app.listen(port, host, () => {
    console.log('El servidor esta funcionando')
});
