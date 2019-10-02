require('./config/config');
const colors = require('colors');
const express = require('express');
const app = express();

app.get( '/', (req, res) => {
    let salida = {
        name: "Gustavo Jorge",
        age: 49,
        url: req.url
    };

    res.send(salida);

});



app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${process.env.PORT}`.cyan);
});