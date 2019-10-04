require('./config/config');
const colors = require('colors');
const express = require('express');
const app = express();

//========================================
//                Routes
//========================================
app.use( require('./routes/routes') );







app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${process.env.PORT}`.cyan);
});