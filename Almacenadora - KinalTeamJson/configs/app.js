'use strict'

const express = require('express');
//Logs de las solicitudes que reciba el servidor
const morgan = require('morgan');
//Seguridad básica al servidor
const helmet = require('helmet');
//Aceptación de solicitudes desde otro origen o desde la misma máquina
const cors = require('cors');
//Instancia de express
const app = express();
const port = process.env.PORT || 3200;

// Rutas
const userRoutes = require('../src/user/user.routes');
const storeRoutes = require('../src/store/store.routes');
const clientRoutes = require('../src/client/client.routes');

//Configurar el servidor de express
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

//Rutas de cada colección 
app.use('/client', clientRoutes);
app.use('/user', userRoutes);
app.use('/store', storeRoutes);

//Función para levanter el puerto
exports.initServer = ()=>{
    app.listen(port);
    console.log(`Server http running in port ${port}`);
}