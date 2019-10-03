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




module.exports = app;