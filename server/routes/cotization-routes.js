const axios = require('axios');
const express = require('express');
const app = express();
const colors = require('colors');
const { tokenVerify } = require('../middlewares/authentication');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// ================================================
//    GET cotization from Alpha Vantage's API
// ================================================

app.get('/cotization', tokenVerify, (req, res) => {

    const url = "https://www.alphavantage.co/query?";
    let myFn = "TIME_SERIES_DAILY";
    let sym = (req.body.company).toUpperCase();
    let query = `${url}function=${myFn}&symbol=${sym}&outputsize=compact&apikey=2UWJHXTSHOIQRGV2`;

    let companies = ["FB", "AAPL", "MSFT", "GOOGL", "AMZN"];
    if (companies.indexOf(sym) < 0) {
        res.status(401).json({
            ok: false,
            message: `El símbolo ${sym} no es válido`
        });
    } else {
        let lastValue;
        let previousValue;
        let dif;
        let output;
        // let salida;


        axios.get(query)
        .then(function (response) {
          // handle success

            let data = response.data;
            let serieName = Object.keys(data);
            let serieData = serieName.pop();
            let series = data[serieData];
            let lastDataName = Object.keys(series).shift(); // console.log("lastDataName:\n", lastDataName);
            let lastDataValues = series[lastDataName]; // console.log("lastDataValues:\n",lastDataValues);

            delete series[lastDataName];

            let previousDataName = Object.keys(series).shift(); // console.log("\npreviousDataName\n", previousDataName);
            lastValue = Number(lastDataValues['4. close']).toFixed(2);
            let previousDataValues = series[previousDataName]; // console.log(previousDataValues);
            previousValue = Number(previousDataValues['4. close']).toFixed(2);
            dif =  lastValue - previousValue;
            // dif =  previousValue -lastValue;

            let salida = {
                "symbol": sym,
                "value": lastValue,
                "previous": previousValue,
                "change_percent": ( (dif)/previousValue*100 ).toFixed(2),
                "change_value": (dif).toFixed(2),
                "color_code": ( (dif) >= 0 ? "green" : "red" ),
            };
            console.log(salida);



            output = {
                ok: true,
                message: salida
            };

            res.status(200).send(output);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
});



module.exports = app;