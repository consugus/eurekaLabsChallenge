
const request = require('request');
const express = require('express');
const app = express();
const { tokenVerify } = require('../middlewares/authentication');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// ================================================
//    GET cotization from Alpha Vantage's API
// ================================================

app.get( '/cotization', tokenVerify,  (req, res) => {

    const url = "https://www.alphavantage.co/query?";
    let myFn = "TIME_SERIES_DAILY";
    let sym = req.body.company;
    let query = `${url}function=${myFn}&symbol=${sym}&outputsize=compact&apikey=2UWJHXTSHOIQRGV2`;

    let companies = ["FB", "AAPL", "MSFT", "GOOGL", "AMZN"];
    if( companies.indexOf(sym) < 0 ) {
        res.status(401).json({
            ok: false,
            message:`El símbolo ${sym} no es válido`
        });
    } else {
        let todayValue;
        let previousValue;
        let dif;
        let output;

        request.get(query, (err, resp, body) => {

            if(err){
                return {
                    ok: false,
                    message: "Sorry, data couldn't be retrieved"
                }
            }

            // FIXME: :
            // * if the day for trying to retrieve the stocks values is Saturday or Sunday oy a holiday,
            // the app chashes as non laborable days there's no cotization

            // The declaration for the exercise is not clear about this situations: if the data retrieve is Monday, should
            // be compared against Friday?

            let today = new Date();
            if(today.getDay() === 6 || today.getDay() === 7){ // In case data is trying to be retrieved Saturday or Sunday
                output =  {
                    ok: false,
                    message: "No se encontraron datos disponibles"
                };
            } else {
                todayValue = Number( JSON.parse(body)["Time Series (Daily)"][getToday().toString()]["4. close"] ).toFixed(2);
                previousValue = Number( JSON.parse(body)["Time Series (Daily)"][getPrevious().toString()]["4. close"] ).toFixed(2);
                dif = todayValue-previousValue; // dif = previousValue-todayValue;

                salida = {
                    "symbol": sym,
                    "value": todayValue,
                    "previous": previousValue,
                    "change_percent": ( (dif)/previousValue*100 ).toFixed(2),
                    "change_value": (dif).toFixed(2),
                    "color_code": ( (dif) >= 0 ? "green" : "red" ),
                };

                output = {
                    ok: true,
                    message: salida
                };
            } // End else

        });

        setTimeout( ( ) => {
            res.status(200).send(output);
        }, 2500);
    }
});

// ================================================
//    Accesories functions for handling Dates
// ================================================

function getToday(){
    let today = new Date();
    let fDate = parseDate(today);
    return `${fDate.year}-${fDate.month}-${fDate.day}`;
}

function getPrevious(){
    let previous = new Date( new Date().getTime() - (1*1000*60*60*24) ) ;
    let fDate = parseDate(previous);
    return `${fDate.year}-${fDate.month}-${fDate.day}`;
}

function parseDate(date){
    return {
        year: date.getFullYear(),
        month: ( (date.getMonth().toString().length > 9) ? `0${date.getMonth()+1}` : date.getMonth()+1 ),
        day: ( (date.getDate().toString().length === 1) ? `0${date.getDay()-1}` : date.getDay()-1 )
    };
}



module.exports = app;